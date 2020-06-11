import React, { useEffect, useMemo, useCallback } from 'react'

import cn from 'classnames'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'

import SearchResult from './SearchResult'
import useQuery from 'hooks/useQuery'
import useAsyncFn from 'hooks/useAsyncFn'
import { setSearchHistory, searchHistoryLocalStorage } from 'helpers/search'
import { debounce } from 'helpers/fn'
import searchApis from 'apis/search'
import Words from './Words'
import useClickAway from 'hooks/useClickAway'
import ROUTES from 'constants/routes'
import { useHistory } from 'react-router-dom'


const { useRef, useState } = React

const Seacher = () => {
    const query = useQuery()
    const history = useHistory()
    const searchRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    //搜索关键词
    const [keyword, setKeyword] = useState(query.keyword || '')

    //显示搜索结果
    const [showResult, setShowResult] = useState(false)

    const [state, searchHotFn] = useAsyncFn(searchApis.searchHot)
    const [searchState, searchSuggestFn] = useAsyncFn(searchApis.searchSuggest)
    const { value: searchResult } = searchState
    useEffect(() => {
        // console.log(1111+'搜索',state,searchHotFn,5,searchApis.searchHot,"000000000")
        // console.log(searchHotFn.toString(),'-----')
        searchHotFn()

    }, [])


    //input获取焦点 展示搜索组件
    const handleInputFocuss = () => setShowResult(true)

    //跳转到搜索页面
    const go2SearchPage = (word: string) => {
        history.push(`${ROUTES.SEARCH}?keyword=${word}`)
        //隐藏搜索框
        setShowResult(false)
        //保存到搜索历史里面
        setSearchHistory(word)
        //搜索框失去焦点
        inputRef.current?.blur()
    }

    //点击词语
    const handleWordClick = (word: string) => {
        //设置关键词
        setKeyword(word)
        //跳转到搜索页面
        go2SearchPage(word)
    }

    useClickAway(searchRef, () => setShowResult(false))

    const handleInputChange = async (value: string) => {
        if (value) {
            await searchSuggestFn({ keywords: value })
        }

    }

    //按回车
    const handleInputKeyPress = (event:React.KeyboardEvent<HTMLDivElement>)=>{
        if(event.key === 'Enter'){
            if(!keyword.trim()){
                return
            }
            go2SearchPage(keyword)
        }
    }

    //缓存确保是同一个函数  不加useCallback 起不到防抖效果 或者使用useMome
    const debounceInputChange = useCallback(debounce(handleInputChange, 500), [])

    return (
        <div className={styles.root} ref={ref => searchRef.current = ref}>
            <div className={styles.searcher}>
                <Icon icon='search' />
                <input
                    type="text"
                    ref={ref => inputRef.current = ref}
                    value={keyword}
                    placeholder="搜索"
                    onFocus={handleInputFocuss}
                    onChange={({ target: { value } }) => {
                        setKeyword(value)
                        debounceInputChange(value)
                    }
                    }
                    onKeyPress={handleInputKeyPress}
                />
            </div>
            <div className={cn(styles.result, showResult && styles.show)}>
                {
                    searchResult && keyword ? (<SearchResult data={searchResult} />) : (
                        <div>
                            <Words
                                title="热门搜索"
                                words={state.value?.map(({ first }) => first)}
                                onWordClick={handleWordClick}
                            />
                            <Words
                                title="搜索历史"
                                words={searchHistoryLocalStorage.getItem()}
                                onWordClick={handleWordClick}
                            />
                        </div>
                    )
                }




            </div>
        </div>
    )
}

export default Seacher
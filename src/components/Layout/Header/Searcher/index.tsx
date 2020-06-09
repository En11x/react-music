import React, { useEffect } from 'react'

import cn from 'classnames'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'

import SearchResult from './SearchResult'
import useAsyncFn from 'hooks/useAsyncFn'
import searchApis from 'apis/search'
import Words from './Words'
import useClickAway from 'hooks/useClickAway'


const { useRef,useState } = React

const Seacher = () => {

    const searchRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    //显示搜索结果
    const [showResult,setShowResult] = useState(false)

    const [state,searchHotFn] = useAsyncFn(searchApis.searchHot)

    useEffect(()=>{
        // console.log(1111+'搜索',state,searchHotFn,5,searchApis.searchHot,"000000000")
        // console.log(searchHotFn.toString(),'-----')
        searchHotFn()
    },[])

    //input获取焦点 展示搜索组件
    const handleInputFocuss = ()=> setShowResult(true)

    useClickAway(searchRef,()=>setShowResult(false))
    return (
        <div className={styles.root} ref={ref=>searchRef.current = ref}>
            <div className={styles.searcher}>
                <Icon icon='search' />
                <input
                    type="text"
                    ref={ref=>inputRef.current = ref}
                    placeholder="搜索"
                    onFocus={handleInputFocuss}
                />
            </div>
            <div className={cn(styles.result,showResult&&styles.show)}>
                <SearchResult data={{ keyWords: 'sada' }} />
                <div>
                    <Words
                        title="热门搜索"

                    />
                    <Words
                        title="搜索历史"

                    />
                </div>
            </div>
        </div>
    )
}

export default Seacher
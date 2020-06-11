import React, { useEffect, useState } from 'react'
import useQuery from 'hooks/useQuery'
import useAsyncFn from 'hooks/useAsyncFn'
import styles from './style.module.css'
import searchApis from 'apis/search'
import { TARGET_TYPE } from 'apis/types/business'
import cn from 'classnames'
import { Spinner } from '@blueprintjs/core'
import MusicList from 'components/MusicList'
import Pagination from 'components/Pagination'
import { PAGE, PAGE_SIZE } from 'constants/pagination'

interface ITab {
    tab: string,
    tabKey: string,
    unit: string,
    key: string,
    searchType: TARGET_TYPE
}

const TABS: IDictionary<ITab> = {
    //单曲
    MUSIC: {
        tab: "单曲",
        tabKey: "MUSIC",
        unit: "首",
        key: "song",
        searchType: TARGET_TYPE.MUSIC
    },
    //歌手
    ARTIST: {
        tab: "歌手",
        tabKey: "ARTIST",
        unit: '位',
        key: 'artist',
        searchType: TARGET_TYPE.ARTIST
    },
    //专辑
    ALBUM: {
        tab: "专辑",
        tabKey: "ALBUM",
        unit: '张',
        key: 'album',
        searchType: TARGET_TYPE.ALBUM
    },
    //歌单
    SONG_LIST: {
        tab: "歌单",
        tabKey: "SONG_LIST",
        unit: '个',
        key: 'playlist',
        searchType: TARGET_TYPE.SONG_LIST
    },
    //用户
    USER: {
        tab: "用户",
        tabKey: "USER",
        unit: '位',
        key: 'userprofile',
        searchType: TARGET_TYPE.USER
    }
}

//搜索页面
const Search = () => {
    const { keyword } = useQuery()
    const [page, setPage] = useState(PAGE)
    const [activeTab, setActiveTab] = useState(TABS.MUSIC.tabKey)
    const { unit, tab, key, searchType } = TABS[activeTab]

    //关键词查询
    const [state, searchFn] = useAsyncFn(searchApis.search)

    const { value: result, loading } = state
  


    //组件重新渲染，或者依赖项更新时调用
    useEffect(() => {
        console.log('重新搜索')
        searchFn({ keywords: keyword, type: searchType })
    }, [keyword, searchType])

    const handlePageChange = (page: number) => {
        setPage(page)
        searchFn({ keywords: keyword, type: searchType,offset:(page-1) * PAGE_SIZE})
    }

    const total = result?.[`${key}Count`] || 0

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span className={styles.keyword}>{keyword}</span>
                    <span className={styles.count}>找到 {total} {unit}{tab}</span>
                </div>
                <div className={styles.tabs}>
                    {
                        Object.keys(TABS).map((key) => {
                            return (
                                <div key={key}
                                    className={cn(styles.tab, activeTab === key && styles.active)}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {TABS[key].tab}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.content}>
                {
                    loading ? <Spinner className={styles.spinner} /> : (
                        <div>
                            {
                                // 歌曲列表
                                activeTab === TABS.MUSIC.tabKey && (
                                    <MusicList data={result?.songs} />
                                )
                                // 歌手
                                //专辑
                                //歌单
                                //用户

                            }
                            {/* 分页 */}
                            <div className='pagination'>
                                <Pagination
                                    page={page}
                                    total={total}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search
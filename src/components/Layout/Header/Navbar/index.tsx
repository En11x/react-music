import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import styles from './style.module.css'
import ROUTES from 'constants/routes'

const NANBAR = {
    [ROUTES.DISCOVERY]:[
        {
            label:"个性推荐",
            route:ROUTES.RECOMMENDATION
        },
        {
            label:"每日歌曲推荐",
            route:ROUTES.RECOMMEND_DAILY
        },
        {
            label:"歌单",
            route:ROUTES.SONG_LIST
        },
        {
            label:"排行榜",
            route:ROUTES.LEADER_BOARD
        },
        {
            label:"歌手",
            route:ROUTES.SINGERS
        },
        {
            label:"最新音乐",
            route:ROUTES.LATEST_MUSIC
        }
    ]
}

const Navbar =()=> {
    const history = useHistory()
    const { pathname } = useLocation()
    //匹配路由
    const matchPathPrefix = Object.keys(NANBAR).find((key)=>pathname.startsWith(key))
    if(!matchPathPrefix){
        return null
    }

    const items = NANBAR[matchPathPrefix]

    //匹配当前页面路由
    const hasMatchRoute = items.find(({route})=>route === pathname)
    //点击item切换路由，history里添加
    const handleItemClick = (route:string)=>{
        history.push(route)
    }

    return (
        <div className={styles.root}>
            {
                items.map(({label,route},index)=>{
                    //匹配判断  路由一样  若没有匹配到路由， 显示第一个
                    const isActive = hasMatchRoute? route === pathname:index === 0
                    return (
                        <div
                            key = {label}
                            className={cn(styles.item,isActive?styles.action:'')}
                            onClick={()=>handleItemClick(route)}
                        >
                            {label}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navbar
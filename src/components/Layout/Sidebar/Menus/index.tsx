import React, { useDebugValue } from 'react'
import { Icon ,IconName } from '@blueprintjs/core'

import ROUTES from 'constants/routes'
import styles from './style.module.css'



interface IMenuItem{
    icon:IconName,
    label:string,
    active?:boolean,
    route:string
}

interface IMenu{
    title?:string,
    items:IMenuItem[]
}

const MENU:IMenu[] = [
    {
        items:[
            {
                icon:'music',
                label:'发现音乐',
                route:ROUTES.DISCOVERY
            },
            {
                icon:'mobile-video',
                label:'视频',
                route:ROUTES.VIDEOS
            }
        ]
    },
    {
        title:"我的音乐",
        items:[
            {
                icon:'import',
                label:'下载管理',
                route:ROUTES.DOWNLOAD
            },
            {
                icon:'cloud',
                label:'我的音乐云盘',
                route:ROUTES.CLOUD
            },
            {
                icon:'star-empty',
                label:'我的收藏',
                route:ROUTES.COLLECTION
            }
        ]
    }
]

const Menus = ()=>{
    return (
        <>
            {
                MENU.map(({title,items},index)=>{
                    return (
                        <div className={styles.block} key={index}>
                            {title&&<div className={styles.title}>{title}</div>}
                            <div className={styles.tabs}>
                                {items.map(({icon,label,route})=>{
                                    return (
                                        <div className={styles.tab} key={label}>
                                            <Icon icon={icon} />
                                            {label}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Menus
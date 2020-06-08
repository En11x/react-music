import React from 'react'
import { Icon } from '@blueprintjs/core'

import Menus from './Menus'

import styles from './style.module.css'

const Sidebar = () => {

    return (
        <div className={styles.root}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <Icon icon='person' />
                </div>
                <div className={styles.name}>
                    <span>未登录</span>
                    <Icon icon='play' />
                </div>
            </div>

            <div className={styles.content}>
                <Menus />
            </div>
        </div>
    )
}

export default Sidebar
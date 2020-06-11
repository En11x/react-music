import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'
import cn from 'classnames'

import styles from './style.module.css'

import ProgressBar from './ProgressBar'
import Artists from 'components/Artists'
import PlayOperations from './PlayOperations'
import PlayMode from './PlayMode'
import AudioTimer from './AudioTimer'
import PlayVolume from './PlayVolume'

const Footer = () => {

    return (
        <div className={styles.root}>
            <div className={styles.progressBar}>
                <ProgressBar />
            </div>

            <div className={styles.songWrap}>
                <div className={cn(styles.pic,styles.showLyric)}>
                    <img src="http://p2.music.126.net/hPCvLRx5TxSWul9YY5n6sA==/109951165023441548.jpg?param=40y40" alt="" loading='lazy' />
                    <div className={styles.mask}>
                        <Icon icon='double-chevron-up' />
                    </div>
                    <div className={styles.mask}>
                        <Icon icon='double-chevron-down' />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div className={styles.name}>音乐名字</div>
                        <Artists />
                    </div>
                    <div className={styles.time}>
                        <AudioTimer />
                    </div>
                </div>

            </div>

            <div className={styles.operations}>
                <PlayOperations />
            </div>

            <div className={styles.otherOperations}>
                <div className={styles.item}>
                    <PlayMode />
                </div>
                <div className={styles.item}>
                    <Tooltip content='打开播放列表'>
                        <Icon icon='menu-closed' />
                    </Tooltip>
                </div>
                <div className={styles.item}>
                    <PlayVolume />
                </div>
            </div>

        </div>
    )

}
export default Footer

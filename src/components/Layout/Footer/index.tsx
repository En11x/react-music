import React, { useState, useContext } from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'
import cn from 'classnames'

import styles from './style.module.css'

import ProgressBar from './ProgressBar'
import Artists from 'components/Artists'
import PlayOperations from './PlayOperations'
import PlayMode from './PlayMode'
import AudioTimer from './AudioTimer'
import PlayVolume from './PlayVolume'
import PlayRecord from './PlayRecord'
import { PlayMusicStateContext, PlayMusicDispatchContext } from 'reducers/playMusic'

const Footer = () => {
    const [showPlayRecord, setShowPlayRecord] = useState(false)
    const dispatch = useContext(PlayMusicDispatchContext)
    //音乐信息上下文
    const playState = useContext(PlayMusicStateContext)
    const { musicId, music, showLyric } = playState

    // console.log(playState, dispatch.toString(), "????")

    const togglePlayRecord = () => {
        setShowPlayRecord(!showPlayRecord)
    }

    return (
        <div className={styles.root}>
            {
                musicId ? (
                    //显示进度条
                    <div className={styles.progressBar}>
                        <ProgressBar />
                    </div>
                ) : null
            }


            <div className={styles.songWrap}>
                {
                    !!musicId && (
                        <>
                            <div className={cn(styles.pic, showLyric && styles.showLyric)}>
                                <img src={music?.picUrl ? `${music.picUrl}?param=40y40` : undefined} loading='lazy' />
                                {
                                    showLyric ? (
                                        <div className={styles.mask}>
                                            <Icon icon='double-chevron-up' />
                                        </div>
                                    ) : (
                                            <div className={styles.mask}>
                                                <Icon icon='double-chevron-down' />
                                            </div>
                                        )
                                }
                            </div>
                            <div>
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        { `${music?.name || '--'} -` }
                                    </div>
                                    <Artists artists={ music?.artists } />
                                </div>
                                <div className={styles.time}>
                                    <AudioTimer />
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

            <div className={styles.operations}>
                <PlayOperations />
            </div>

            <div className={styles.otherOperations}>
                <div className={styles.item}>
                    <PlayMode />
                </div>
                <div onClick={togglePlayRecord} className={styles.item}>
                    <Tooltip content='打开播放列表'>
                        <Icon icon='menu-closed' className={showPlayRecord ? 'active' : ''} />
                    </Tooltip>
                </div>
                <div className={styles.item}>
                    <PlayVolume />
                </div>
            </div>

            <PlayRecord
                show={showPlayRecord}
                onClickAway={() => setShowPlayRecord(false)}
            />
        </div>
    )

}
export default Footer

import React, { useContext } from 'react'
import cn from 'classnames'
import styles from './style.module.css'
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic'

import playBar from 'assets/image/play-bar.png'
import playCd from 'assets/image/play-cd.png'
import Lyric from './Lyric'

const MusicDetail = () => {

    const playState = useContext(PlayMusicStateContext)
    const { music, musicId, showLyric } = playState

    const audioInfo = useContext(AudioContext)
    const isPlaying = !audioInfo.state?.paused

    return (
        <div className={cn(styles.root, showLyric && styles.show)}>
            {
                showLyric && <>
                    <div className={styles.music}>
                        <div className={styles.cdWrap}>
                            <div className={styles.cd}>
                                <div className={styles.bar}>
                                    <img src={playBar} className={cn(styles.playBar, !isPlaying && styles.pause)} />
                                    <img src={playCd} className={styles.playCd} />
                                </div>
                                <div className={styles.circle}>
                                    <div className={cn(styles.cover, isPlaying && styles.rotate)}>
                                        <img src={`${music?.picUrl || music?.album?.blurPicUrl}?param=190y190`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.lyric}>
                            <div className={styles.name}>{music?.name}</div>
                            <div className={styles.artists}>
                                歌手：
                                <span>{music?.artists.map(item => item.name).join(' / ')}</span>
                            </div>
                            <div className={styles.lrc}>
                                <Lyric />
                            </div>
                        </div>
                    </div>
                    <div className={styles.relatedInfo}></div>
                </>
            }
        </div>
    )

}
export default MusicDetail

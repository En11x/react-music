import React, { useContext, useCallback, useMemo } from 'react'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'
import { AudioContext, PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { playList as playListLocalStorage } from 'helpers/paly'


const PlayOperations = () => {

    const audioInfo = useContext(AudioContext)
    const { state: audioState, controls } = audioInfo

    const state = useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)
    const { musicId } = state

    //获取播放列表
    const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

    const play = (prev?: boolean) => {
        const len = playList.length
        if (!len) return

        //正在播放音乐的序号
        const index = playList.findIndex(item => item.id === musicId)
        //下一首播放歌曲的序号
        let nextIndex = -1
        if (index > -1) {
            nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
        } else {
            nextIndex = 0
        }

        dispatch({
            type:ACTIONS.PLAY,
            payload:{
                musicId:playList[nextIndex].id,
                music:playList[nextIndex]
            }
        })
    }

    const playPrev = useCallback(()=>play(true),[play])
    const playnext = useCallback(()=>play(),[play])

    //点击播放和暂停
    const togglePlayStatus = useCallback(() => {
        audioState?.paused ? controls?.play() : controls?.pause()
    }, [audioState?.paused, controls])

    return (
        <>
            <div className={styles.prev}>
                <Icon icon='step-backward' onClick={playPrev}/>
            </div>
            <div className={styles.pause} onClick={togglePlayStatus}>
                <Icon icon={audioState?.paused ? 'play' : 'pause'} />
            </div>
            <div className={styles.next}>
                <Icon icon='step-forward' onClick={playnext}/>
            </div>
        </>
    )

}
export default PlayOperations

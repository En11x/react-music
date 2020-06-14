import React, { useContext, useCallback } from 'react'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'
import { AudioContext } from 'reducers/playMusic'

const PlayOperations = () => {

    const audioInfo = useContext(AudioContext)
    const { state :audioState,controls  } = audioInfo
    

    //点击播放和暂停
    const togglePlayStatus = useCallback(()=>{
        audioState?.paused?controls?.play():controls?.pause()
    },[audioState?.paused,controls])

    return (
        <>
            <div className={styles.prev}>
                <Icon icon='step-backward' />
            </div>
            <div className={styles.pause} onClick={togglePlayStatus}>
                <Icon icon={audioState?.paused?'play':'pause'} />
            </div>
            <div className={styles.next}>
                <Icon icon='step-forward' />
            </div>
        </>
    )

}
export default PlayOperations

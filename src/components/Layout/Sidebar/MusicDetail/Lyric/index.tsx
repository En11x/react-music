import React, { useRef, useState, useContext, useEffect } from 'react'
import styles from './style.module.css'
import { AudioContext, PlayMusicStateContext } from 'reducers/playMusic'
import useAsyncFn from 'hooks/useAsyncFn'
import songApis from 'apis/song'
import { Spinner } from '@blueprintjs/core'

const Lyric = () => {

    const lyricRef = useRef<HTMLDivElement | null>()
    const [ line,setLine ] = useState(0)

    const audioInfo = useContext(AudioContext)
    const state = useContext(PlayMusicStateContext)

    const { musicId,showLyric } = state

    const [lyricState,getLyricFn] = useAsyncFn(songApis.getLyric)

    useEffect(()=>{
        if(musicId && showLyric ){
            getLyricFn(musicId)
        }
    },[musicId,showLyric])

    useEffect(()=>{
        
    },[])

    return (
        <div className={styles.root} ref={ref=>lyricRef.current = ref}>
            {
                lyricState.loading?<Spinner className='spinner' />:(
                    <>
                        {

                        }
                    </>
                )
            }
        </div>
    )

}
export default Lyric

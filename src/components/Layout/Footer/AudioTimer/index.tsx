import React, { useContext, useMemo } from 'react'
import { AudioContext } from 'reducers/playMusic'
import { formatTime } from 'helpers/time'

const AudioTimer = () => {

    const audioInfo = useContext(AudioContext)
    const { state } = audioInfo
    console.log(audioInfo,'????')
    const time = useMemo(() => {
        return `${formatTime(state?.time)} / ${formatTime(state?.duration)}`
    }, [state?.time, state?.duration])

    return (
        <div>{time}</div>
    )

}
export default AudioTimer

import React, { useContext, useMemo, useCallback } from 'react'

import BaseProgressBar from 'components/ProgressBar'
import { AudioContext } from 'reducers/playMusic'
import { formatTime } from 'helpers/time'

const ProgressBar = () => {

    const { state, controls } = useContext(AudioContext)

    const donePercent = useMemo(() => {
        return state?.duration ? state.time / state.duration : 0
    }, [
        state?.time, state?.duration
    ])

    const renderLabel = useCallback(()=>{
        return formatTime(state?.time)
    },[state?.time])

    
    //点击进度条
    const handleBarClick = useCallback((percent:number) => {
        controls?.seek( (state?.duration||0) * percent)
    },[state?.duration,controls])
    
    return (
        <BaseProgressBar
            donePercent={donePercent}
            renderLabel={renderLabel}
            onBarClick={handleBarClick}
        />
    )

}
export default ProgressBar

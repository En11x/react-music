import React, { useContext, useMemo, useCallback } from 'react'

import styles from './style.module.css'
import { Icon } from '@blueprintjs/core'

import ProgressBar from 'components/ProgressBar'
import { AudioContext } from 'reducers/playMusic'

const PlayVolume = () => {

    const audioInfo = useContext(AudioContext)
    const { state, controls } = audioInfo

    let isVolume = state?.volume !== 0

    const originDonePercent = useMemo(() => {
        //指定2位小数
        const volume = Number((state?.volume || 0).toFixed(2))
        return Math.floor(volume * 100)
    }, [state?.volume, controls?.volume])

    const handleBarClick = (precent: number) => {
        controls?.volume(precent)
    }

    return (
        <div className={styles.root}>
            <Icon icon={isVolume ? 'volume-up' : 'volume-off'} />
            <div className={styles.progress}>
                <ProgressBar
                    className={styles.bar}
                    originDonePercent={originDonePercent}
                    onBarClick={handleBarClick}
                />
            </div>
        </div>
    )

}
export default PlayVolume

import React, { useEffect, useState, useMemo, useContext } from 'react'

import personalizedApis from 'apis/personalized'
import useAsyncFn from 'hooks/useAsyncFn'
import { Spinner } from '@blueprintjs/core'

import styles from './style.module.css'
import BannerItem from './BannerItem'
import cn from 'classnames'
import useInterval from 'hooks/useInterval'
import { TARGET_TYPE } from 'apis/types/business'
import songApis from 'apis/song'
import { ACTIONS, PlayMusicDispatchContext } from 'reducers/playMusic'

const Banner = () => {

    const [state, getBannerFn] = useAsyncFn(personalizedApis.getBanner)
    const { value: banners = [], loading: isGettingBanner } = state
    const [currentMid, setCurrentMid] = useState(0)

    const dispatch = useContext(PlayMusicDispatchContext)

    useEffect(() => {
        getBannerFn()
    }, [])

    useInterval(() => {
        if (!banners.length) {
            return
        }
        setCurrentMid((currentMid + 1) % banners.length)
    }, 6000)


    const bannersClassName = useMemo(() => {
        const len = banners.length
        const left = (currentMid - 1 + len) % len
        const right = (currentMid + 1) % len

        return {
            [currentMid]: styles.middle,
            [left]: styles.left,
            [right]: styles.right
        }

    }, [currentMid, banners])

    const handleMidChange = (index: number) => {
        setCurrentMid(index)
    }

    const handleItemClick = async (musicId: number) => {
        const songs = await songApis.getSongDetail([musicId])
        if (songs.length) {
            dispatch({
                type: ACTIONS.PLAY,
                payload: {
                    musicId,
                    music: songs[0]
                }
            })
        }
    }

    return (
        isGettingBanner ? <Spinner /> :
            <div className={styles.root}>
                <div className={styles.banners}>
                    {
                        banners.map(({ imageUrl, typeTitle, targetType, targetId }, index) => {
                            const className = bannersClassName[index] || styles.hidden
                            const isMusicType = targetType === TARGET_TYPE.MUSIC
                            return (
                                <BannerItem
                                    key={imageUrl}
                                    className={cn(className, isMusicType && styles.enabled)}
                                    typeTitle={typeTitle}
                                    imageUrl={imageUrl}
                                    onClick={isMusicType ? () => handleItemClick(targetId) : undefined}
                                />
                            )
                        })
                    }
                </div>
                <div className={styles.dots}>
                    {
                        banners.map(({ imageUrl }, index) => {
                            return (
                                <div
                                    key={imageUrl}
                                    className={cn(styles.dot, currentMid === index && styles.active)}
                                    onMouseOver={() => handleMidChange(index)}
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
    )

}
export default Banner
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'

import { REPOSITORY } from 'constants/github'
import Searcher from './Searcher'
import Navbar from './Navbar'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const Header = () => {
    const history = useHistory()
    //向后退
    const handleGoBack = () => history.goBack()
    //向前进
    const handleGoForward = () => history.goForward()

    const { showLyric } = useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)

    const hideLyric = () => {
        dispatch({
            type: ACTIONS.HIDE_LYRIC
        })
    }

    return (
        <div className={styles.root}>
            <div className={styles.actions}>
                <div className={styles.iconsWrap}>
                    <div className={styles.circle}>
                        <Icon icon="cross" iconSize={8} />
                    </div>
                    <div className={styles.circle}>
                        <Icon icon="minus" iconSize={8} />
                    </div>
                    <div className={styles.circle}>
                        <Icon icon="maximize" iconSize={8} />
                    </div>
                    {
                        showLyric && (
                            <div className={styles.down} onClick={hideLyric}>
                                <Icon icon="chevron-down" iconSize={20} />
                            </div>
                        )
                    }

                </div>
                {
                    !showLyric && (
                        <div className={styles.backForward}>
                            <div><Icon icon="chevron-left" onClick={handleGoBack} /></div>
                            <div><Icon icon="chevron-right" onClick={handleGoForward} /></div>
                        </div>
                    )
                }
            </div>
            <div className={styles.content}>
                <div>
                    {
                        !showLyric && <Navbar />
                    }
                </div>
                <div className={styles.opertions}>
                    <Searcher />
                    <div className={styles.githubLogo} onClick={() => window.open(REPOSITORY)}></div>
                </div>
            </div>
        </div>
    )
}

export default Header
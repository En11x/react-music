import React, { useContext, useState, useEffect } from 'react'
import { Icon, Popover, Menu, MenuItem } from '@blueprintjs/core'

import Menus from './Menus'

import styles from './style.module.css'
import { LogStateContext, LogDispatchContext, ACTIONS } from 'reducers/log'
import LoginDialog from './LoginDialog'
import useAsyncFn from 'hooks/useAsyncFn'
import authApis from 'apis/auth'
import songlistApis from 'apis/songlist'
import Songlist from './Songlist'
import MusicDetail from './MusicDetail'
import { PlayMusicStateContext } from 'reducers/playMusic'

let b = 0

const Sidebar = () => {

    const logState = useContext(LogStateContext)
    const { isLogined, user } = logState

    const playState = useContext(PlayMusicStateContext)


    const [logOutState, logOutFn] = useAsyncFn(authApis.logout)

    const [songlistState, getUserSonglistFn] = useAsyncFn(songlistApis.getUserSonglist)

    const dispatch = useContext(LogDispatchContext)

    const [showLoginDialog, setShowLoginDialog] = useState(false)

    const handleNameClick = () => setShowLoginDialog(true)
    const handleLoginDialogClose = () => setShowLoginDialog(false)

    useEffect(() => {
        if (isLogined) {
            getUserSonglistFn(user.userId)
        }
    }, [isLogined])


    //退出登录
    const handleLogout = async () => {
        await logOutFn()
        dispatch({
            type: ACTIONS.LOGOUT,
        })
    }

    return (
        <div className={styles.root}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    {
                        isLogined ? <img src={user.profile.avatarUrl} loading='lazy' /> : <Icon icon='person' />
                    }
                </div>
                {
                    isLogined ? (
                        <Popover
                            interactionKind='hover'
                            content={(
                                <Menu>
                                    <MenuItem icon='log-out' text='退出登录' onClick={handleLogout}></MenuItem>
                                </Menu>
                            )}
                        >
                            <div className={styles.name}>
                                <span>{user.profile.nickname}</span>
                                <Icon icon='play' />
                            </div>
                        </Popover>
                    ) : (
                            <div className={styles.name} onClick={handleNameClick}>
                                <span>未登录</span>
                                <Icon icon='play' />
                            </div>
                        )
                }

            </div>

            <div className={styles.content}>
                <Menus />
                {
                    !songlistState.loading && isLogined && (
                        <>
                            <div className={styles.block}>
                                <Songlist title='创建的歌单' data={songlistState.value?.create} />
                            </div>
                            <div className={styles.block}>
                                <Songlist title='收藏的歌单' data={songlistState.value?.collect} />
                            </div>
                        </>
                    )
                }
            </div>

            {
                showLoginDialog && (
                    <LoginDialog
                        isOpen={showLoginDialog}
                        onClose={handleLoginDialogClose}
                    />
                )
            }

            {!!playState.musicId && <MusicDetail />}
        </div >
    )
}

export default Sidebar
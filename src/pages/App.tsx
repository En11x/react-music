import React, { useReducer, useMemo, useCallback } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import Layout from 'components/Layout'
import ROUTES from 'constants/routes'
import playMusicReducer, { PlayMusicStateContext, initialState, PlayMusicDispatchContext, AudioContext, ACTIONS } from 'reducers/playMusic'
import useAudio from 'hooks/useAudio'
import { MODE } from 'helpers/paly'
import { playList as playListLocalStorage } from 'helpers/paly'
import logReducer, { LogStateContext, initialState as loginLnitialState, LogDispatchContext } from 'reducers/log'

const { lazy, Suspense } = React

const Discovery = lazy(() => import('./Discovery'))
const Videos = lazy(() => import('./Videos'))
const Search = lazy(() => import('./Search'))
const SonglistDetail = lazy(() => import('./SonglistDetail'))
const DownLoad = lazy(() => import('./Download'))
const Cloud = lazy(() => import('./Cloud'))
const Collection = lazy(() => import('./Collection'))


const App = () => {

    const [state, dispatch] = useReducer(playMusicReducer, initialState)
    const { musicId, musicUrl, playMode } = state

    const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

    //audio 播放器信息
    const [audio, audioState, audioControls, audioRef] = useAudio({
        src: musicUrl,
        autoPlay: true,
        onEnded: () => playNextMusic(),
        onError: () => {
            console.log('onError,播放错误')
            if (playMode === MODE.SINGLE_CYCLE) return
            playNextMusic()
        }
    })

    //登录状态
    const [logState, logDispatch] = useReducer(logReducer, loginLnitialState)

    const audioInfo = useMemo(() => {
        return {
            audio,
            state: audioState,
            controls: audioControls,
            ref: audioRef
        }
    }, [musicUrl, audio, audioState, audioControls, audioRef])


    //播放下一首歌曲
    const playNextMusic = useCallback(() => {
        switch (playMode) {
            case MODE.PLAY_IN_ORDER: {
                //顺序播放下一首
                const index = playList.findIndex(item => item.id === musicId)
                if (playList.length) {
                    const nextIndex = index > -1 ? (index + 1) % playList.length : 0
                    playMusic(nextIndex)
                }
                return
            }
            case MODE.SINGLE_CYCLE: {
                //单曲循环
                audioControls.play()
                return
            }
            case MODE.SHUFFLE_PALYBACK: {
                const idx = Math.floor(Math.random() * playList.length)
                playMusic(idx)
                return
            }
            default:
                return
        }
    }, [musicId, playMode, playList])

    //播放音乐
    const playMusic = (index: number) => {
        dispatch({
            type: ACTIONS.PLAY,
            payload: {
                musicId: playList[index].id,
                music: playList[index]
            }
        })
    }

    return (

        <BrowserRouter>
            <LogDispatchContext.Provider value={logDispatch}>
                <LogStateContext.Provider value={logState}>
                    <PlayMusicDispatchContext.Provider value={dispatch}>
                        <PlayMusicStateContext.Provider value={state}>
                            <AudioContext.Provider value={audioInfo}>
                                <Layout>
                                    {audio}
                                    <Suspense fallback={null}>
                                        <Switch>
                                            {/* 个性推荐 */}
                                            <Route path={ROUTES.DISCOVERY} component={Discovery}></Route>
                                            {/* 视频 */}
                                            <Route path={ROUTES.VIDEOS} component={Videos}></Route>
                                            {/* 搜索 */}
                                            <Route exact path={ROUTES.SEARCH} component={Search}></Route>
                                            {/* 歌单详情 */}
                                            <Route exact path={ROUTES.SONG_LIST_DETAIL} component={SonglistDetail}></Route>
                                            {/* 下载管理 */}
                                            <Route exact path={ROUTES.DOWNLOAD} component={DownLoad}></Route>
                                            {/* 我的音乐云盘 */}
                                            <Route exact path={ROUTES.CLOUD} component={Cloud}></Route>
                                            {/* 我的收藏 */}
                                            <Route exact path={ROUTES.COLLECTION} component={Collection}></Route>
                                            {/* 重定向 */}
                                            <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
                                        </Switch>
                                    </Suspense>
                                </Layout>
                            </AudioContext.Provider>
                        </PlayMusicStateContext.Provider>
                    </PlayMusicDispatchContext.Provider>
                </LogStateContext.Provider>
            </LogDispatchContext.Provider>
        </BrowserRouter>

    )
}

export default App
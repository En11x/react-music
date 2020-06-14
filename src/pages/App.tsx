import React, { useReducer, useMemo } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import Layout from 'components/Layout'
import ROUTES from 'constants/routes'
import playMusicReducer, { PlayMusicStateContext, initialState, PlayMusicDispatchContext, AudioContext } from 'reducers/playMusic'
import useAudio from 'hooks/useAudio'

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

    //audio 播放器信息
    const [audio, audioState, audioControls, audioRef] = useAudio({
        src: musicUrl,
        autoPlay: true,
        onEnded: () => { console.log('onEnded,播放结束') },
        onError: () => { console.log('onError,播放错误') }
    })

    const audioInfo = useMemo(() => {
        return {
            audio,
            state: audioState,
            controls: audioControls,
            ref: audioRef
        }
    }, [musicUrl, audio, audioState, audioControls, audioRef])


    return (

        <BrowserRouter>
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
        </BrowserRouter>

    )
}

export default App
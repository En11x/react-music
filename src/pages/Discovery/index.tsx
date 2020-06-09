import React, { lazy, Suspense } from 'react'

import ROUTES from 'constants/routes'
import styles from './style.module.css'
import { Switch, Route, Redirect } from 'react-router-dom'

const Recommendation = lazy(()=>import('./Recommendation'))
const RecommendDaily = lazy(()=>import('./RecommendDaily'))
const Songlist = lazy(()=>import('./Songlist'))
const LeaderBoard = lazy(()=>import('./LeaderBoard'))
const Singers = lazy(()=>import('./Singers'))
const LatestMusic = lazy(()=>import('./LatestMusic'))

const Discovery = ()=>{
    return (
        <div className={styles.root}>
            <Suspense fallback={null}>
                <Switch>
                    {/* 个性推荐 */}
                    <Route exact path={ROUTES.RECOMMENDATION} component={Recommendation}></Route>
                    {/* 每日歌曲推荐 */}
                    <Route exact path={ROUTES.RECOMMEND_DAILY} component={RecommendDaily}></Route>
                    {/* 歌单 */}
                    <Route exact path={ROUTES.SONG_LIST} component={Songlist}></Route>
                    {/* 排行榜 */}
                    <Route exact path={ROUTES.LEADER_BOARD} component={LeaderBoard}></Route>
                    {/* 歌手 */}
                    <Route exact path={ROUTES.SINGERS} component={Singers}></Route>
                    {/* 最新音乐 */}
                    <Route exact path={ROUTES.LATEST_MUSIC} component={LatestMusic}></Route>


                    <Route exact path={ROUTES.DISCOVERY} component={Recommendation}></Route>
                    <Redirect from={`${ROUTES.DISCOVERY}/*`} to={ROUTES.RECOMMENDATION} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Discovery
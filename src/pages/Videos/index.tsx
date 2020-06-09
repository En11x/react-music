import React, { Suspense, lazy } from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'
import ROUTES from 'constants/routes'

const Video = lazy(()=>import('./Video'))
const MV = lazy(()=>import('./MV'))

const Videos = ()=>{
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route exact path={ROUTES.VIDEO} component={Video}></Route>
                <Route exact path={ROUTES.MV} component={MV}></Route>
                <Route exact path={ROUTES.VIDEOS} component={Video}></Route>
                <Redirect from={`${ROUTES.VIDEOS}/*`} to={ROUTES.VIDEO} />
            </Switch>
        </Suspense>
    )
}

export default Videos
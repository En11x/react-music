import React, { useContext } from 'react'
import { Tooltip, Icon, IconName } from '@blueprintjs/core'

import { MODE } from 'helpers/paly'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const MODE_ORDER = [MODE.PLAY_IN_ORDER, MODE.SINGLE_CYCLE, MODE.SHUFFLE_PALYBACK]
const MODE_MAP: IDictionary<{
    label: string,
    icon: IconName
}> = {
    [MODE.PLAY_IN_ORDER]: {
        label: '顺序播放',
        icon: 'sort'
    },
    [MODE.SINGLE_CYCLE]: {
        label: '单曲循环',
        icon: 'repeat'
    },
    [MODE.SHUFFLE_PALYBACK]: {
        label: '随机播放',
        icon: 'random'
    }
}

const PlayMode = () => {

    const state = useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)

    console.log(state, './././')
    const { playMode } = state

    const handleClick = () => {
        const idx = MODE_ORDER.findIndex(item => item === playMode)
        const nextMode = MODE_ORDER[(idx + 1) % (MODE_ORDER.length)]

        //更新状态
        dispatch({
            type:ACTIONS.SET_PLAY_MODE,
            payload:{
                playMode:nextMode
            }
        })
    }

    return (
        <Tooltip content={MODE_MAP[playMode].label}>
            <Icon icon={MODE_MAP[playMode].icon} onClick={handleClick} />
        </Tooltip>
    )

}
export default PlayMode

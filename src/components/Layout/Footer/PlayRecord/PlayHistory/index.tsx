import React, { useContext } from 'react'
import { playHistory as playHistoryLocalStorage } from 'helpers/paly'
import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const PlayHistory = () => {
    const state = useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)

    const playHistory = playHistoryLocalStorage.getItem()

    const handleDoubleClick = async (item: IMyMusic) => {

        dispatch({
            type: ACTIONS.PLAY,
            payload: {
                musicId: item.id,
                music: item,
                keepOrder: true   //按照历史记录播放
            }
        })


    }

    const handleClear = () => {
        console.log('清除历史记录')
        dispatch({
            type: ACTIONS.CLEAR_PLAY_HISTORY
        })
    }


    return (
        <List
            data={playHistory}
            onClear={handleClear}
            onDoubleClick={handleDoubleClick}
        />
    )

}
export default PlayHistory

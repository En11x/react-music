import React, { useContext } from 'react'
import List from '../List'
import { playList as playListLocalStorage } from 'helpers/paly'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'



const PlayList = () => {
    const state =useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)

    const playList =  playListLocalStorage.getItem()

    const handleDoubleClick = (item:IMyMusic)=>{
        console.log(item,'店家。。。')
        dispatch({
            type:ACTIONS.PLAY,
            payload:{
                musicId:item.id,
                music:item
            }
        })
    }

    const handleClear = ()=>{
        dispatch({
            type:ACTIONS.CLEAR_PLAY_LIST
        })    
    }

    return (
        <List
            data = {playList}
            onClear={handleClear}
            onDoubleClick={handleDoubleClick}
        />
    )

}
export default PlayList

import { localStorageFactory, DEFAULT_VALUE } from "./localStorage";
import { IMyMusic } from "apis/types/business";

enum KEY{
    PLAY_HISTORY = '__playHistory',
    PLAY_LIST = '__playList',
    PLAY_MODE = '__playMode'
}

export enum MODE{
    PLAY_IN_ORDER = 'PLAY_IN_ORDER',
    SINGLE_CYCLE = 'SINGLE_CYCLE',
    SHUFFLE_PALYBACK = 'SHUFFLE_PALYBACK'
}


//播放列表
export const playList = localStorageFactory<IMyMusic[]>({
    key:KEY.PLAY_LIST,
    defaultValue:DEFAULT_VALUE.ARRAY
})



//历史记录
export const playHistory = localStorageFactory<IMyMusic[]>({
    key:KEY.PLAY_HISTORY,
    defaultValue:DEFAULT_VALUE.ARRAY
})

//增加历史记录
export const setPlayHistory = (music:IMyMusic):IMyMusic[]=>{

    const list = playHistory.getItem().slice(0,100)
    const index = list.findIndex(item=>item.id === music.id)

    if(index > -1){
        //存在此首音乐,历史记录删除
        list.splice(index,1)
    }
    //添加到第一位
    list.unshift(music)
    //更新历史记录
    playHistory.setItem(list)
    return list
}

//播放模式
export const playMode = localStorageFactory<MODE>({
    key:KEY.PLAY_MODE,
    defaultValue:MODE.PLAY_IN_ORDER,
    raw:true
})
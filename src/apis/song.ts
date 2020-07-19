import { IMyMusic, ISimpleMusic } from "./types/business";
import axios from 'helpers/axios'
import { createMusicFromSimpleMusic } from "helpers/business";


type GetSongDetailFn = (ids:number[]) =>Promise<IMyMusic[]>
type GetgetLyricFn = (id:number)=> Promise<{lyric:string,offset:number,version:number}>


const getSongDetail:GetSongDetailFn = async (ids)=>{
    const response = await axios({
        url:'/song/detail',
        params:{
            ids:ids.join(',')
        }
    })
    return response.songs.map((item:ISimpleMusic)=>createMusicFromSimpleMusic(item))
}

//获取歌词
const getLyric:GetgetLyricFn = async (id)=>{
    const response = await axios({
        url:'/lyric',
        params:{
            id
        }
    })

    return response.lrc
}

export default {
    getSongDetail,
    getLyric
}
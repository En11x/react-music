import { IMyMusic } from "apis/types/business"


//获取音乐url
export const getMusicUrl = (id?:number):string=>{
    return id?`https://music.163.com/song/media/outer/url?id=${id}.mp3`:''
}


//自定义一个音乐对象
export const createMusic = ({id,name,artists,duration,picUrl,...others}:IMyMusic)=>{
    return{
        id,
        name,
        artists,
        duration,
        picUrl,
        ...others
    }
}
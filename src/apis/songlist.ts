import axios from "helpers/axios";
import { ISonglist } from "./types/business";
import { PAGE_SIZE } from "constants/pagination";

type GetUserSongListFn = (
  uid: number
) => Promise<{ create: ISonglist[]; collect: ISonglist[] }>;


const getUserSonglist:GetUserSongListFn = async (uid)=>{
    const response = await axios({
        url:'/user/playlist',
        params:{
            uid,
            limit:PAGE_SIZE
        }
    })
    const playList:ISonglist[] = response.playlist || []
    const create = playList.filter(item=>item.creator.userId === uid)
    const collect = playList.filter(item=>item.creator.userId !== uid)
    return {
        create,
        collect
    }

}


export default {
    getUserSonglist
}
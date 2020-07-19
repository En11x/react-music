import { IBanner, IGetPersonalizedSonglistRequest } from "./types/personalized";
import axios from "helpers/axios";
import { ISonglist } from "./types/business";

type GetBannerFn = () => Promise<IBanner[]>;
type GetPersonalizedSonglistFn = (
  params: IGetPersonalizedSonglistRequest
) => Promise<ISonglist[]>;

const getBanner: GetBannerFn = async () => {
  const response = await axios({
    url: "/banner",
    params: {
      type: 0,
    },
  });
  return response.banners;
};

//获取用户推荐歌单
const getPersonalizedSonglist: GetPersonalizedSonglistFn = async ({ limit }) => {

    const response = await axios({
        url:'/personalized',
        params:{
            limit
        }
    })
    return response.result || []
};

export default {
  getBanner,
  getPersonalizedSonglist
};

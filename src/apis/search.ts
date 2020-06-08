import axios from "helpers/axios";
import { ISearchHot } from "./types/search";

type SearchHotFn = () => Promise<ISearchHot[]>;

const searchHot: SearchHotFn = async () => {
  const response = await axios({
    url: "/search/hot",
  });
  return response.result.hots;
};

export default {
  searchHot,
};

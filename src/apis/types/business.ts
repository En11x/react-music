//定义接口类型

// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export enum TARGET_TYPE {
  MUSIC = 1,
  ALBUM = 10,
  ARTIST = 100,
  SONG_LIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  BROADCASTING_STATION = 1009,
  VIDEO = 1014,
}

export enum MUSIC_TYPE{
    VIP = 1
}

export enum MUSIC_STATUS{
    NOT_FOUND = -200
}

//作者
export interface IArtist {
  albumSize: number;
  alia?: string[];
  alias?: string[];
  id: string;
  img1v1Id: number;
  img1v1Url: string;
  name: string;
  picId: string;
  picUrl: string;
  topicPerson: number;
  musicSize: number;
}

//专辑
export interface IAlbum {
  artist?: IArtist;
  artists?: IArtist[];
  blurPicUrl?: string;
  copyrightId?: number;
  description?: string;
  id: number;
  mark?: number;
  name: string;
  picId?: number;
  picUrl: string;
  publishTime?: number;
  size?: number;
  status?: number;
  subType?: string;
  type?: string;
}

//mv
export interface IMV {
  artistId: number;
  artistName: string;
  artists: IArtist[];
  cover: string;
  duration: number;
  id: number;
  mark: number;
  mv: any;
  name: string;
  playCount: number;
  subed: boolean;
}

//歌曲
export interface IMusic {
  album: IAlbum;
  alias?: string[];
  artists: IArtist[];
  copyrightId?: number;
  duration: number;
  fee?: number;
  ftype?: number;
  id: number;
  mark?: number;
  mvid?: number;
  name: string;
  status?: number;
  picUrl?: string;
}

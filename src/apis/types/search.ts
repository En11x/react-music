import { IAlbum, IArtist, IMV, IMusic, TARGET_TYPE } from "./business";

 
//热门搜索接口
export interface ISearchHot{
    first:string,
    iconType:number,
    second:number
}

//搜索历史接口
export interface ISearchSuggestRequest {
    keywords:string
}

export interface ISearchSuggestType{
    albums:'albums',
    artists:'artists',
    mvs:"mvs",
    songs:"songs"
}

export type TypeKey = 'artists'| 'albums'|'mvs' | 'songs'

export interface ISearchSuggestResponse{
    order:TypeKey[],
    albums:IAlbum[],
    artists:IArtist[],
    mvs:IMV[],
    songs:IMusic[]
}

export interface ISearchRequest{
    keywords:string,
    type?:TARGET_TYPE,  //搜索类型
    limit?:number,     //返回数量
    offset?:number     //偏移量
}
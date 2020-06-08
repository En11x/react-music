
//热门搜索接口
export interface ISearchHot{
    first:string,
    iconType:number,
    second:number
}

//搜索历史接口
export interface ISearchSuggestRequest {
    keyWords:string
}
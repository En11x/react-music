
export interface IGetPersonalizedSonglistRequest{
    limit?:number
}

export interface IBanner{
    exclusive:boolean,
    imageUrl:string,
    targetId:number,
    targetType:number,
    titleColor:string,
    typeTitle:string,
    url:string
}
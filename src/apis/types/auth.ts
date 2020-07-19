export interface ILoginRequest{
    phone:string,
    password:string
}

export interface ILoginResult{
    token:string,
    userId:number,
    profile:{
        userId:number,
        vipType:number,
        gender:number,
        accountStatus:number,
        nickname:string,
        birthday:number,
        city:number,
        userType:number,
        backgroundImgId:number,
        detailDescription:string,
        followed:boolean,
        backgroundUrl:string,
        avatarUrl:string,
        province:number,
        defaultAvatar:boolean,
        authStatus:number,
        description:string,
        signaturer:string,
        authority:string,
        followeds:number,
        follows:number,
        eventCount:number,
        playlistCount:number,
        olaylistBeSubscibedCount:number
    }
}
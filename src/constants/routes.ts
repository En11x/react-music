//定义路由名称
const ROOT:string = '/'

const DISCOVERY:string = '/discovery'
//个性推荐
const RECOMMENDATION: string = `${DISCOVERY}/recommendation`
//歌单
const SONG_LIST: string = `${DISCOVERY}/songlist`
//每日推荐
const RECOMMEND_DAILY: string = `${DISCOVERY}/recommend_daily`
//排行榜
const LEADER_BOARD: string = `${DISCOVERY}/leaderboard`
//歌手
const SINGERS: string = `${DISCOVERY}/singers`
//最新音乐
const LATEST_MUSIC: string = `${DISCOVERY}/latestmusic`

//视频
const VIDEOS:string = '/videos'
const VIDEO:string =`${VIDEOS}/video`

//下载管理
const DOWNLOAD:string = "/download"

//音乐云盘
const CLOUD:string = '/cloud'

//我的收藏
const COLLECTION:string = '/collection'

//MV
const MV:string = `${VIDEOS}/mv`

//搜索
const SEARCH:string = '/search'

//歌单详情
const SONG_LISTS:string = '/songlists'
const SONG_LIST_DETAIL:string = `${SONG_LISTS}/:songlistId`

//默认路由
const DEFAULT_ROUTE:string = DISCOVERY

const ROUTES = {
    ROOT,
    DISCOVERY,
    RECOMMENDATION,
    RECOMMEND_DAILY,
    LATEST_MUSIC,
    LEADER_BOARD,
    SINGERS,
    SONG_LIST,
    VIDEOS,
    VIDEO,
    DOWNLOAD,
    CLOUD,
    COLLECTION,
    DEFAULT_ROUTE,
    MV,
    SEARCH,
    SONG_LISTS,
    SONG_LIST_DETAIL
}

export default ROUTES
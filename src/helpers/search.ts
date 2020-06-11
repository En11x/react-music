import { DEFAULT_VALUE, localStorageFactory} from './localStorage'

const KEY = '__searchHistory'

export const searchHistoryLocalStorage = localStorageFactory<string[]>({
    key:KEY,
    defaultValue:DEFAULT_VALUE.ARRAY
})

export const setSearchHistory = (keyword:string)=>{
    keyword = keyword.trim()
    if(!keyword)return 
    //获取locastorage中的值 
    let data:string[] = searchHistoryLocalStorage.getItem()
    //截取前10个
    data = data.slice(0,10)

    const index = data.findIndex(key=>key === keyword)
    if(index>-1){data.splice(index,1)}
    //添加到第一个
    data.unshift(keyword)

    //重新保存到localstorage中
    searchHistoryLocalStorage.setItem(data)
}
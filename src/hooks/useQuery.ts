import { useLocation } from "react-router-dom"


const useQuery = ()=>{
    //获取Url中查询字符串
    const { search } = useLocation()
    const result:IDictionary<string>={}
    // ?name='asd'&age=12 => {name:'asd',age:12}
    search.substr(1).split('&').reduce((prev,curr)=>{
        const [key,value] = curr.split('=')
        prev[key] = decodeURIComponent(value)
        return prev
    },result)
    return result
}

export default useQuery
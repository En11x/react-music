const parseTimeRanges = (ranges:any)=>{
    const result : { start:number,end:number }[] = []
    for(let i=0;i<ranges.length;i++){
        result.push({
            //获取某个已缓冲返回的开始位置
            start:ranges.start(i),
            //获取某个已缓冲范围的结束位置
            end:ranges.end(i)
        })
    }
    return result
}

export default parseTimeRanges
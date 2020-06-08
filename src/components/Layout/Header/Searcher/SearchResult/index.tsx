import React from 'react'

import {ISearchSuggestRequest} from 'apis/types/search'

interface IProps{
    data:ISearchSuggestRequest
}

const SearchResult:React.FC<IProps> = (props)=>{
    return (
        <div>搜索结果
            {JSON.stringify(props)}
        </div>
    )
}

export default SearchResult
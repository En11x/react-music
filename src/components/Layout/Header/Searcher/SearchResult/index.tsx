import React from 'react'

import { ISearchSuggestResponse } from 'apis/types/search'
import { IMusic, IAlbum, IArtist, IMV } from 'apis/types/business'
import Item from './Item'
import styles from './style.module.css'

interface IProps {
    data: ISearchSuggestResponse
}

const SearchResult: React.FC<IProps> = ({ data }) => {
    const { order } = data

    const config: {
        [key: string]: any
    } = {
        songs: {
            title: '单曲',
            icon: "music",
            renderLabel: (item: IMusic) => `${item.name} - ${item.artists.map(({ name }) => name).join('/')}`,
            // onItemClick:
        },
        albums: {
            title: '专辑',
            icon: 'headset',
            renderLabel: (item: IAlbum) => `${item.name} - ${item.artist?.name}`
        },
        artists: {
            title: '歌手',
            icon: 'person',
            renderLabel: (item: IArtist) => `${item.name}`
        },
        mvs: {
            title: '视频',
            icon: 'mobile-video',
            renderLabel: (item: IMV) => `${item.name} - ${item.artistName}`
        }
    }

    return (
        <div>
            {
                order?.map((type)=>{
                    const configOfType = config[type]
                    const itemData = data[type]

                    if(!configOfType){ return null }

                    return (
                        <Item
                            key={type}
                            {...configOfType}
                            data={itemData}
                        />
                    )

                })
            }
            { !order && <div className={styles.empty}>没有结果喔</div> }
        </div>
    )
}

export default SearchResult
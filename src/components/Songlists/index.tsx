import React from 'react'
import { ISonglist } from 'apis/types/business'
import SonglistItem from './SonglistItem'
import styles from './style.module.css'



interface IProps {
    data?: ISonglist[]
}


const Songlists: React.FC<IProps> = ({ data }) => {

    return (
        <div className={styles.root}>
            {
                data?.map(({ id, name, playCount, picUrl, coverImgUrl }, index) => {
                    return (
                        <SonglistItem
                            key={index}
                            id={id}
                            name={name}
                            playCount={playCount}
                            picUrl={picUrl || coverImgUrl}
                        />
                    )
                })
            }
        </div>
    )

}
export default Songlists

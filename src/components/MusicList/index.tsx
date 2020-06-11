import React from 'react'
import { IMusic, IArtist, IAlbum, MUSIC_TYPE, MUSIC_STATUS } from 'apis/types/business'
import Table, { IColumn } from 'components/Table'
import { formatTime } from 'helpers/time'
import cn from 'classnames'
import styles from './style.module.css'
import VipIcon from 'components/VipIcon'
import { Icon } from '@blueprintjs/core'


interface IProps {
    data: IMusic[],
    onPlayAll?: (autoPlay?: boolean) => void
}

const MusicList: React.FC<IProps> = ({ data, onPlayAll }) => {

   

    //每列怎么展示
    const columns: IColumn<IMusic, keyof IMusic>[] = [
        {
            title: "",
            key: "name",
            width: "80px",
            render: (name: string, record: IMusic, index?: number) => {
                return (
                    <div className={styles.operations}>
                        {
                            // 显示播放或暂停按钮 判断当前音乐是否在播放
                            false ? (
                                <span className={styles.isPlaying}>
                                    <Icon icon='volume-off' iconSize={14} />
                                </span>
                            ) : (
                                    <span className={styles.index}>
                                        {(index || 0) + 1}
                                    </span>
                                )
                        }
                        <Icon icon='import' iconSize={14} />
                    </div>
                )
            }
        },
        {
            title: "音乐标题",
            key: "name",
            width: "45%",
            render: (name: string, { alias, id, fee }: IMusic) => {
                return (
                    <>
                        <div className={cn(styles.name)}>
                            <span>{name}</span>
                            {fee === MUSIC_TYPE.VIP && <VipIcon />}
                        </div>
                        {
                            alias?.length ? <div className={styles.alias}>
                                {alias.join(' ')}
                            </div> : null
                        }
                    </>
                )
            }
        },
        {
            title: "歌手",
            key: "artists",
            width: "15%",
            render: (artists: IArtist[]) => artists.map(({ name }) => name).join(' / ')
        },
        {
            title: "专辑",
            key: "album",
            width: "20%",
            render: (album: IAlbum) => album.name
        },
        {
            title: "时长",
            key: "duration",
            width: "10%",
            render: (duration: number) => formatTime(duration / 1000)
        }
    ]

    //双击
    const handleDoubleClick = (music:IMusic)=>{
        console.log(music,'?????')
    }

    const checkRowIsDisabled = (music:IMusic) => music.status === MUSIC_STATUS.NOT_FOUND

    return (
        <div>
            <Table<IMusic>
                columns={columns}
                data={data}
                onDoubleClick={handleDoubleClick}
                isRowDisabled={checkRowIsDisabled} />
        </div>
    )

}
export default MusicList

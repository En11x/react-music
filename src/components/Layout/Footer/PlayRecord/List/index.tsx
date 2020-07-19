import React, { useContext } from 'react'
import { IMyMusic, MUSIC_TYPE, IArtist, MUSIC_STATUS } from 'apis/types/business'
import Table, { IColumn } from 'components/Table'
import cn from 'classnames'
import styles from './style.module.css'
import { Icon } from '@blueprintjs/core'
import VipIcon from 'components/VipIcon'
import { formatTime } from 'helpers/time'
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic'

interface IProps {
    data: IMyMusic[],
    onDoubleClick: (item: IMyMusic) => void,
    onClear: () => void
}

const List: React.FC<IProps> = ({ data, onClear, onDoubleClick }) => {

    const state = useContext(PlayMusicStateContext)
    const audioInfo = useContext(AudioContext)

    const columns: IColumn<IMyMusic, keyof IMyMusic>[] = [
        {
            key: 'name',
            width: '55%',
            render: (name: string, { id, fee }: IMyMusic) => {
                //正在播放
                const isActive = state.musicId === id

                return (
                    <div className={cn(styles.name, isActive && 'active')} >
                        {
                            isActive && (
                                <Icon iconSize={13}
                                    icon={audioInfo.state?.paused ? 'pause' : "play"}
                                    className={styles.icon}
                                />
                            )
                        }
                        <div className={styles.text}>
                            <span>{name}</span>
                            {fee === MUSIC_TYPE.VIP && <VipIcon />}
                        </div>
                    </div>
                )
            }
        },
        {
            key: 'artists',
            width: '30%',
            render: (artists: IArtist[], { id }: IMyMusic) => {
                return (
                    <div className={state.musicId === id ? 'active' : ''}>
                        {artists.map(({ name }) => name).join(' / ')}
                    </div>
                )
            }
        },
        {
            key: 'duration',
            width: '15%',
            render: (duration: number) => formatTime(duration /1000)
        }
    ]

    return (
        <>
            <div className={styles.header}>
                <div className={styles.count}>
                    总{data.length}首
                </div>
                {
                    data.length > 0 && (
                        <div className={styles.actions}>
                            <div onClick={onClear}>
                                <Icon icon='trash' iconSize={15} />
                                {' 清空'}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={styles.list}>
                <Table<IMyMusic>
                    columns={columns}
                    data={data}
                    showHeader={false}
                    onDoubleClick={onDoubleClick}
                    isRowDisabled={(item: IMyMusic) => item.status === MUSIC_STATUS.NOT_FOUND}
                />
            </div>
        </>
    )

}
export default List

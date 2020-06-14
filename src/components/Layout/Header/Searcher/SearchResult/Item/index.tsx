import React from 'react'
import { IconName, Icon } from '@blueprintjs/core'
import { IAlbum, IArtist, IMV, IMusic } from 'apis/types/business'

import styles from './style.module.css'
import { noop } from 'helpers/fn'

type Type = IAlbum | IArtist | IMV | IMusic

interface IItemProps {
    title: string,
    icon: IconName,
    data: Type[],
    renderLabel: (item: any) => string,
    onItemClick?: (item: any) => void
}

const Item: React.FC<IItemProps> = ({ title, icon, data, renderLabel, onItemClick=noop }) => {

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <Icon icon={icon} />
                {title}
            </div>
            <div className={styles.content}>
                { data.map((item,index)=>{
                    return (
                        <div onClick={()=>onItemClick(item)} className={styles.item} key={index}>
                            {renderLabel(item)}
                        </div>
                    )
                }) }
            </div>
        </div>
    )

}
export default Item

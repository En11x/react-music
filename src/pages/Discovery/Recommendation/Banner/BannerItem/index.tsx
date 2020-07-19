import React from 'react'

import styles from './style.module.css'
import cn from 'classnames'
import { noop } from 'helpers/fn'

interface IProps{
    typeTitle:string,
    imageUrl:string,
    className?:string,
    onClick?:()=>void
}

const BannerItem:React.FC<IProps> = ({typeTitle,imageUrl,className,onClick=noop}) => {

    return (
        <div className={cn(styles.root,className)} onClick={onClick}>
            <img src={imageUrl} loading='lazy' />
            <div className={styles.type}>
                {typeTitle}
            </div>
        </div>
    )

}
export default BannerItem

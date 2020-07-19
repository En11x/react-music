import React, { useContext } from 'react'
import styles from './style.module.css'
import { ISonglist } from 'apis/types/business'
import cn from 'classnames'
import { LogStateContext } from 'reducers/log'

interface IProps{
    title:string,
    data?:ISonglist[]
}

const Songlist:React.FC<IProps> = ({title,data}) => {

    const logState = useContext(LogStateContext)

    return (
        <div className={styles.root}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>
                {
                    data?.map(({id,name})=>{
                        
                        return (
                            <div
                                key={id}
                                className={cn(styles.item)}
                            >{name.replace(logState.user.profile.nickname,'我')}</div>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default Songlist

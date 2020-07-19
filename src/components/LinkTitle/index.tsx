import React from 'react'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'
import { useHistory } from 'react-router-dom'


interface IProps{
    title:string,
    route:string
}

const LinkTitle:React.FC<IProps> = ({title,route}) => {

    const history = useHistory()
    const handleClick = (route:string)=>{
        history.push(route)
    }
    return (
        <div className={styles.root} onClick={()=>handleClick(route)}>
            {title}
            <Icon icon='chevron-right' />
        </div>
    )

}
export default LinkTitle

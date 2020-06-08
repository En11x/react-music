import React from 'react'

import styles from "./style.module.css"

interface IProps{
    title:string
}

const Words:React.FC<IProps> = ({title})=>{
    return (
        <div className={styles.root}>
            <div className={styles.title}>{title}</div>
            <div className={styles.words}>
                <span className={styles.word}>sad</span>
                <span className={styles.word}>sad</span>
                <span className={styles.word}>sad</span>
                <span className={styles.word}>sad</span>
            </div>
        </div>
    )
}

export default Words
import React from 'react'
import styles from './style.module.css'
import Banner from './Banner'
import Songlist from './Songlist'

const Recommendation = ()=>{
    return (
        <div className={styles.root}>
            <Banner />
            
            <div className={styles.block}>
                <Songlist />
            </div>
        </div>
    )
}

export default Recommendation
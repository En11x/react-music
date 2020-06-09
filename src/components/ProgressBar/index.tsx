import React from 'react'
import styles from './style.module.css'

const ProgressBar = () => {

    return (
        <div className={styles.root}>
            <div className={styles.doneWrap}>
                <div className={styles.done}></div>
                <div className={styles.controllDot}>
                    <div className={styles.label}>
                        123
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProgressBar

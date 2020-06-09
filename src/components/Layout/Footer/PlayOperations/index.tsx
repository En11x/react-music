import React from 'react'
import { Icon } from '@blueprintjs/core'
import styles from './style.module.css'

const PlayOperations = () => {

    return (
        <>
            <div className={styles.prev}>
                <Icon icon='step-backward' />
            </div>
            <div className={styles.pause}>
                <Icon icon='play' />
            </div>
            <div className={styles.next}>
                <Icon icon='step-forward' />
            </div>
        </>
    )

}
export default PlayOperations

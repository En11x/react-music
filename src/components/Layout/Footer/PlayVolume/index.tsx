import React from 'react'

import styles from './style.module.css'
import { Icon } from '@blueprintjs/core'

import ProgressBar from 'components/ProgressBar'

const PlayVolume = () => {

    return (
        <div className={styles.root}>
            <Icon icon='volume-off' />
            <div className={styles.progress}>
                <ProgressBar className={styles.bar} onBarClick={()=>{}} />
            </div>
        </div>
    )

}
export default PlayVolume

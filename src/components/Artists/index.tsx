import React from 'react'
import styles from './style.module.css'
import { IArtist } from 'apis/types/business'

interface IProps {
    artists?: IArtist[]
}

const Artists: React.FC<IProps> = ({ artists }) => {
    console.log(artists, '..')
    return (
        <div className={styles.root}>
            {
                artists?.map(({ name }, index) =>
                    index !== artists.length - 1 ? (
                        <div key={name}>
                            <span className={styles.singer}>{name}</span>
                            <span className={styles.slash}> / </span>
                        </div>
                    ) : (
                            <span key={name} className={styles.singer}>{name}</span>
                        )
                )
            }

        </div>
    )

}
export default Artists

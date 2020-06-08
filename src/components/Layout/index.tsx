import React from 'react'

import Header from './Header/index'
import Sidebar from './Sidebar'

import styles from './style.module.css'

//function components
const Layout:React.FC = ()=>{
    return (
        <div>
            <Header />
            <div className={styles.middle}>
                <Sidebar />
                <div className={styles.content}></div>
            </div>
        </div>
    )
}

export default Layout
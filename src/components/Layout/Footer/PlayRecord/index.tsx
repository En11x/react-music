import React, { useRef, useState } from 'react'

import styles from './style.module.css'
import cn from 'classnames'
import useClickAway from 'hooks/useClickAway'
import PlayList from './PlayList'
import PlayHistory from './PlayHistory'

interface IProps {
    show: boolean,
    onClickAway: () => void
}

interface ITab {
    tab: string,
    tabKey: string,
}

const TABS: IDictionary<ITab> = {
    PLAY_LIST: {
        tab: "播放列表",
        tabKey: "PLAY_LIST"
    },
    PLAY_HISTORY: {
        tab: '历史记录',
        tabKey: 'PLAY_HISTORY'
    }
}



const PlayRecord: React.FC<IProps> = ({ show, onClickAway }) => {
    const playRecordRef = useRef<HTMLDivElement | null>(null)

    const [activeTab, setActiveTab] = useState(TABS.PLAY_LIST.tabKey)
    useClickAway(playRecordRef, onClickAway)

    return (
        <div
            className={cn(styles.root, show && styles.show)}
            ref={ref => playRecordRef.current = ref}
        >
            {
                show && <>
                    <div className={styles.tabs}>
                        {
                            Object.keys(TABS).map(key => {
                                return (
                                    <div
                                        key={key}
                                        className={cn(styles.tab, activeTab === key && styles.active)}
                                        onClick={() => setActiveTab(key)}
                                    >
                                        {TABS[key].tab}
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={styles.content}>
                        {
                            activeTab === TABS.PLAY_LIST.tabKey ? (<PlayList />) : (<PlayHistory />)
                        }
                    </div>
                </>
            }
        </div>
    )

}
export default PlayRecord

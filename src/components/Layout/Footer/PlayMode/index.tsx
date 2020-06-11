import React from 'react'
import { Tooltip, Icon, IconName } from '@blueprintjs/core'

import { MODE } from 'helpers/paly'

const MODE_MAP : IDictionary<{
    label:string,
    icon:IconName
}> = {
    [MODE.PLAY_IN_ORDER]:{
        label:'顺序播放',
        icon:'sort'
    },
    [MODE.SINGLE_CYCLE]:{
        label:'单曲循环',
        icon:'repeat'
    },
    [MODE.SHUFFLE_PALYBACK]:{
        label:'随机播放',
        icon:'random'
    }
}

const PlayMode = () => {

    return (
        <Tooltip>
           <Icon icon='random' /> 
        </Tooltip>
    )

}
export default PlayMode

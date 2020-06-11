import React, { useMemo, useRef, useCallback, useState } from 'react'
import styles from './style.module.css'
import cn from 'classnames'

import { isNumber } from 'helpers/is'

interface IProps{
    className?:string,
    donePercent?:number,
    originDonePercent?:number,
    renderLabel?:()=>string,
    onBarClick:(donePercent:number)=>void
}

const ProgressBar:React.FC<IProps> = ({
    donePercent = 0,
    originDonePercent,
    renderLabel,
    onBarClick,
    className
}) => {

    const barRef = useRef<HTMLDivElement | null>()
    const dotRef = useRef<HTMLDivElement | null>()

    const getPercent = useCallback((event:React.MouseEvent<HTMLDivElement>)=>{
        //获取相对于视窗的位置集合
        const box = barRef.current?.getBoundingClientRect()
        const clickX = event.pageX - (box?.x||0)

        //比例
        const percent = barRef.current?clickX/barRef.current.offsetWidth:0
        return percent
    },[])

    const handleBarClick = useCallback((event:React.MouseEvent<HTMLDivElement>)=>{
        const percent = getPercent(event)
        onBarClick(percent)
    },[])

    //提示进度条的长度
    const width = useMemo(()=>{
        return `${isNumber(originDonePercent)?originDonePercent:donePercent*100}%`
    },[donePercent,originDonePercent])

    return (
        <div className={cn(styles.root,className)} ref={(ref)=>barRef.current = ref} onClick={handleBarClick}>
            <div className={styles.doneWrap} style={{width}}>
                <div className={styles.done}></div>
                <div className={styles.controllDot} draggable={true}>
                    <div className={styles.label}>
                        {renderLabel?renderLabel():width}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProgressBar

import React, { ReactElement } from 'react'
import { noop } from 'helpers/fn'
import styles from './style.module.css'
import cn from 'classnames'

export interface IColumn<T, Key extends keyof T> {
    title?: string,
    key: Key,
    width?: string,
    render: (value: any, record: T, index?: number) => string | ReactElement
}

interface IProps<T> {
    showHeader?: boolean,
    columns: IColumn<T, keyof T>[],
    data: T[],
    onDoubleClick?: (item: T) => void,
    isRowDisabled: (record: T) => boolean
}

//表格组件
function Table<T extends Object = any>({
    showHeader = true,
    columns,
    data,
    onDoubleClick = noop,
    isRowDisabled
}: IProps<T>) {

    return (
        <div className={styles.root}>
            {
                showHeader && <div className={styles.header}>
                    {
                        columns.map(({ title, width }, index) => {
                            return (
                                <div key={index} style={{ width }}>{title}</div>
                            )
                        })
                    }
                </div>
            }
            {
                data?.length?(
                    <div className={styles.content}>
                        {
                            data.map((item,index)=>{
                                const isDisabled = isRowDisabled && isRowDisabled(item)
                                return (
                                    <div 
                                        key={index} 
                                        className={cn(styles.row,isDisabled && styles.disabled)}
                                        onDoubleClick={isDisabled?noop:()=>onDoubleClick(item)}
                                    >
                                        {
                                            columns.map(({key,width,render},idx)=>{
                                                return (
                                                    <div key={idx} style={{width}}>
                                                        {render(item[key],item,index)}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ):(
                    <div className={styles.empty}>暂无数据喔</div>
                )
            }
        </div>
    )

}
export default Table

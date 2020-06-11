//分页组件
import React, { useState } from 'react'

import styles from './style.module.css'
import cn from 'classnames'
import { Icon } from '@blueprintjs/core'
import { TOTAL, PAGE, PAGE_SIZE } from 'constants/pagination'
import { noop } from 'helpers/fn'

interface IProps {
    total?: number,
    page?: number,
    pageSize?: number,
    onPageChange: (page: number) => void
}


//显示最多页码数
const MAX_SHOW_PAGE_COUNT = 10
const PAGE_LEFT_BORDER = 5
const PAGE_SCALE = 3

const Pagination: React.FC<IProps> = ({ total = TOTAL, page = PAGE, pageSize = PAGE_SIZE, onPageChange = noop }) => {



    //当前页
    const [currentPage, setCurrentPage] = useState(page)
    //总页数
    const pageCount = Math.ceil(total / pageSize)
    //是否是第一页
    const isFirstPage = currentPage === 1
    //是否是最后一页
    const isLastPage = currentPage === pageCount

    //点击确定的页面
    const handleItemClick = (page: number) => {
        //改变当前页
        setCurrentPage(page)
        //传给父组件
        onPageChange(page)
    }

    //点击上一页
    const handlePrev = () => {
        if (isFirstPage) return
        handleItemClick(currentPage - 1)
    }

    //点击下一页
    const handleNext = () => {
        if (isLastPage) return
        handleItemClick(currentPage + 1)
    }

    //创建页码元素
    const createPageItem = (page: number | string = ''): JSX.Element => {
        const isNumber = typeof page === 'number'
        return (
            <div key={page}
                className={cn(styles.item, currentPage === page && styles.active,!isNumber && styles.dotItem)}
                onClick={!isNumber?noop:()=>handleItemClick(page as number)}
            >
                {isNumber ? page : '...'}
            </div>
        )
    }

    //创建一个范围的元素
    const createContinuousPageItems = (start: number, end: number) => {
        const pages = []
        for (let i = start; i <= end; i++) {
            const pageItem = createPageItem(i)
            pages.push(pageItem)
        }
        return pages
    }

    const createPages = (elements: (JSX.Element | JSX.Element[])[]) => {
        let result: JSX.Element[] = []
        elements.forEach(item => {
            const temp = Array.isArray(item) ? item : [item]
            result = [...result, ...temp]
        })
        return result
    }

    const renderPages = () => {
        let result: JSX.Element[] = []

        if (pageCount <= MAX_SHOW_PAGE_COUNT) {
            result = createContinuousPageItems(1, pageCount)
            return result
        }

        const KEY = {
            LEFT: 'LEFT',
            RIGHT: 'RIGHT'
        }

        const firstPage = createPageItem(PAGE)
        const lastPage = createPageItem(pageCount)
        const leftDot = createPageItem(KEY.LEFT)
        const rightDot = createPageItem(KEY.RIGHT)
        const PAGR_RIGHT_BORDER = pageCount - PAGE_LEFT_BORDER + 1

        //当前页小于5
        if (currentPage <= PAGE_LEFT_BORDER) {
            result = createPages([
                firstPage,
                // 2到 8页
                createContinuousPageItems(2, PAGE_LEFT_BORDER + PAGE_SCALE),
                rightDot,
                lastPage
            ])
        } else if (currentPage >= PAGR_RIGHT_BORDER) {
            //当前页在右边
            result = createPages([
                firstPage,
                leftDot,
                createContinuousPageItems(PAGR_RIGHT_BORDER - PAGE_SCALE, pageCount)
            ])
        } else {
            //当前页在中间
            result = createPages([
                firstPage,
                leftDot,
                createContinuousPageItems(currentPage - PAGE_SCALE, currentPage + PAGE_SCALE),
                rightDot,
                lastPage
            ])
        }

        return result
    }

    return (
        <div className={styles.root}>
            <div onClick={handlePrev} className={cn(styles.item, isFirstPage && styles.disabled)}>
                <Icon icon="chevron-left" />
            </div>
            <div className={styles.pages}>{renderPages()}</div>
            <div onClick={handleNext} className={cn(styles.item, isLastPage && styles.disabled)}>
                <Icon icon='chevron-right' />
            </div>
        </div>
    )

}
export default Pagination

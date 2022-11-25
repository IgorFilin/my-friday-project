import React from 'react'
import { AppPagination } from './AppPagination'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { setPageAC, setPageCountAC } from 'redux/cardsReducer'

export const CardsPagination: React.FC = () => {
    const { page, pageCount, cardsTotalCount } = useAppSelector((state) => state.cards)
    const dispatch = useAppDispatch()

    const setPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }

    const setPageCountHandler = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }

    return (
        <AppPagination
            page={page}
            rowsPerPage={pageCount}
            totalCount={cardsTotalCount}
            setPage={setPageHandler}
            setPageCount={setPageCountHandler}
            itemsCaption={'Cards'}
        />
    )
}

import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import Pagination from '@mui/material/Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setPageAC, setPageCountAC } from '../../redux/packsReducer'

export const PaginationPacksList = () => {
    const dispatch = useAppDispatch()

    const pageCount = useAppSelector((state) => state.packsCard.pageCount)
    const page = useAppSelector((state) => state.packsCard.page)
    const cardPacksTotalCount = useAppSelector((state) => state.packsCard.cardPacksTotalCount)

    const TotalCountPages = Math.round(cardPacksTotalCount / pageCount)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        dispatch(setPageAC(newPage + pageCount))
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
    }

    const currentPageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPageAC(page))
    }

    return (
        <div style={{ display: 'flex', width: '100%', margin: '10px auto' }}>
            <Pagination
                color={'primary'}
                count={TotalCountPages}
                variant="outlined"
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={currentPageHandler}
            />
            <TablePagination
                sx={{
                    mt: -1,
                }}
                component="div"
                count={cardPacksTotalCount}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pageCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    )
}

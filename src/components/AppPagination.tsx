import React from 'react'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

type PropsType = {
    rowsPerPage: number
    page: number
    totalCount: number
    setPageCount: (newPageCount: number) => void
    setPage: (newPageCount: number) => void
    itemsCaption?: string
}

export const AppPagination: React.FC<PropsType> = ({
    totalCount,
    rowsPerPage,
    page,
    setPage,
    setPageCount,
    itemsCaption,
}) => {
    const onChangeRowsPerPageHandler = (e: SelectChangeEvent<number>) => {
        const newPageSize = +e.target.value
        const newPage = Math.ceil((page * rowsPerPage - rowsPerPage + 1) / newPageSize)
        setPageCount(newPageSize)
        setPage(newPage)
    }

    const onChangePageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <Box
            sx={{
                mt: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Pagination
                color={'primary'}
                count={Math.floor(totalCount / rowsPerPage) + 1}
                variant="outlined"
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={onChangePageHandler}
            />
            <Box sx={{ ml: 2 }}>
                <span>Show</span>
                <Select
                    sx={{ ml: 1, mr: 1 }}
                    value={rowsPerPage}
                    onChange={onChangeRowsPerPageHandler}
                    variant={'standard'}
                >
                    {[5, 10, 25].map((v) => (
                        <MenuItem key={v} value={v}>
                            {v}
                        </MenuItem>
                    ))}
                </Select>
                <span>{itemsCaption ?? 'Items'} per Page</span>
            </Box>
        </Box>
    )
}

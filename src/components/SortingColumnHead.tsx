import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

type PropsType = {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    caption: string
    sortName: string
    sort?: string
    onChangeSort?: (sortName: string) => void
}

export const SortingColumnHead: React.FC<PropsType> = ({
    caption,
    align,
    sort,
    sortName,
    onChangeSort,
}) => {
    let direction: 'asc' | 'desc' | undefined
    if (sort) {
        const sortingColumn = sort.slice(1)
        if (sortingColumn === caption) {
            const directionCode = sort.slice(0, 1)
            if (directionCode === '0') direction = 'asc'
            if (directionCode === '1') direction = 'desc'
        }
    }

    const onSortHandler = () => {
        onChangeSort && onChangeSort(sortName)
    }

    return (
        <TableCell align={align}>
            <TableSortLabel onClick={onSortHandler} direction={direction}>
                {caption}
            </TableSortLabel>
        </TableCell>
    )
}

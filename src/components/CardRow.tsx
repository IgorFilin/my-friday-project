import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import IconButton from '@mui/material/IconButton'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteIcon from '@mui/icons-material/Delete'

export type PackType = {
    id: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

type PropsType = {
    row: PackType
    onDelete: (id: string) => void
    onEdit: (id: string, question: string, answer: string) => void
}

export const CardRow: React.FC<PropsType> = ({ row, onDelete, onEdit }) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {row.question}
            </TableCell>
            <TableCell align="center">{row.answer}</TableCell>
            <TableCell align="center">{row.lastUpdated}</TableCell>
            <TableCell align="right">
                <Rating
                    name="card grade"
                    value={row.grade}
                    precision={0.1}
                    readOnly
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={() => onEdit(row.id, row.question, row.answer)}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

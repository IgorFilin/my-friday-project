import * as React from 'react'
import {useEffect} from 'react'
import {styled} from '@mui/material/styles'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {sortCardsAC} from '../../redux/decksReducer'
import {RequestStatus} from '../../redux/appReducer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel/TableSortLabel'
import TableBody from '@mui/material/TableBody'
import {RatingComponent} from './RatingComponent'
import TableContainer from '@mui/material/TableContainer'
import {LinearProgress} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export const TableComponent = () => {
    const style = {
        backgroundColor: '#c1bfbf',
    }

    const decks = useAppSelector((state) => state.decks.cardsState)
    const sort = useAppSelector((state) => state.decks.sortCards)
    const pageCount = useAppSelector((state) => state.decks.cardsState.pageCount)
    const dispatch = useAppDispatch()

    useEffect(() => {}, [sort, pageCount])

    const createSortHandler = () => {
        const valueSort = sort === '0grade' ? '1grade' : '0grade'
        dispatch(sortCardsAC(valueSort))
    }

    return (
        <>
                <TableContainer component={Paper}>
                    <Table
                        sx={{
                            width: '100%',
                            margin: '20px auto',
                            backgroundColor: '#f6f6f6',
                        }}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell style={style}>Question</TableCell>
                                <TableCell style={style} align="right">
                                    Answer
                                </TableCell>
                                <TableCell style={style} align="right">
                                    <TableSortLabel
                                        sx={{ ml: '5px' }}
                                        active={true}
                                        onClick={createSortHandler}
                                        direction={sort === '0grade' ? 'asc' : 'desc'}
                                    >
                                        Last Updated
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={style} align="right">
                                    Grade
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks.cards.map((card) => (
                                <StyledTableRow key={card._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {card.question}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{card.answer}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {card.updated.slice(0, 10).split('-').reverse().join('.')}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <RatingComponent />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </>
    )
}

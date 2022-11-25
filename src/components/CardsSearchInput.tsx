import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { RequestStatus } from 'redux/appReducer'
import { setCardQuestionAC } from 'redux/cardsReducer'

type PropsType = {
    width: string | number
}

export const CardsSearchInput: React.FC<PropsType> = ({ width }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const cardQuestion = useAppSelector((state) => state.cards.cardQuestion)
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCardQuestionAC(e.currentTarget.value))
    }

    return (
        <Box
            sx={{
                width,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}
        >
            <Typography variant="h6">Search</Typography>
            <TextField
                disabled={requestStatus === RequestStatus.loading}
                size={'small'}
                placeholder={'Provide your text'}
                value={cardQuestion}
                onChange={onChangeHandler}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchSharpIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

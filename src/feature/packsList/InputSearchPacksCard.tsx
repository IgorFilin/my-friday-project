import React, { ChangeEvent, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import Box from '@mui/material/Box'
import { useDebounce } from 'usehooks-ts'
import { setPackNameAC } from '../../redux/packsReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { RequestStatus } from '../../redux/appReducer'

export const InputSearchPacksCard: React.FC<{ width?: number | string }> = ({ width }) => {
    const dispatch = useDispatch()

    const namePack = useAppSelector((state) => state.packsCard.packName)
    const requestStatus = useAppSelector((state) => state.app.request.status)

    const [inputValue, setInputValue] = useState(namePack)
    useEffect(() => {
        setInputValue(namePack)
    }, [namePack])
    const debouncedValue = useDebounce<string>(inputValue, 500)

    useEffect(() => {
        dispatch(setPackNameAC(inputValue))
    }, [debouncedValue])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
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
                value={inputValue}
                onChange={handleChange}
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

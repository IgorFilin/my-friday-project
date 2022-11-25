import React, {ChangeEvent, useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {InputAdornment} from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import Box from '@mui/material/Box'
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {useDebounce} from "usehooks-ts";
import {searchDecksAC} from "../redux/decksReducer";


export const InputSearch: React.FC<{ width?: number | string, handleRequest?: (val:string) => void }> = ({width,handleRequest}) => {

    const dispatch = useDispatch()

    const cardAnswer = useAppSelector(state => state.decks.cardAnswer)
    const [inputValue, setInputValue] = useState(cardAnswer)

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }
    const ifNotChangeInputValue = inputValue !== cardAnswer &&  inputValue && handleRequest
    const debouncedValue = useDebounce<string>(inputValue, 1000)

    useEffect(() => {
        if(inputValue !== cardAnswer) dispatch(searchDecksAC(inputValue))
        ifNotChangeInputValue && handleRequest(inputValue)
    }, [debouncedValue])


    return (
        <Box
            sx={{
                width,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}
        >
            <Typography sx={{
                mt: '28px'
            }} variant="h6">Search</Typography>
            <TextField
                size={'small'}
                placeholder={'Provide your text'}
                value={inputValue}
                onChange={onChangeInputValue}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchSharpIcon/>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

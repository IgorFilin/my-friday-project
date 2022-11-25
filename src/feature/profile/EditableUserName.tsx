import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'

type PropsType = {
    value: string
    disabled?: boolean
    onConfirm: (newValue: string) => void
    onCancel?: () => void
}
export const EditableUserName: React.FC<PropsType> = ({ disabled, onCancel, onConfirm, value }) => {
    const [changingValue, setChangingValue] = useState(value)
    const [isEditing, setIsEditing] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangingValue(e.currentTarget.value)
    }

    const setSpanMode = () => setIsEditing(false)
    const setInputMode = () => !disabled && setIsEditing(true)

    const cancel = () => {
        setSpanMode()
        setChangingValue(value)
        if (onCancel) onCancel()
    }

    const confirm = () => {
        setSpanMode()
        onConfirm(changingValue)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') confirm()
        if (e.key === 'Escape') cancel()
    }

    const error = changingValue.trim().length < 1

    return (
        <Box sx={{ mb: 1, display: 'inline-flex', alignItems: 'center' }}>
            {isEditing ? (
                <>
                    <TextField
                        size={'small'}
                        variant={'standard'}
                        InputProps={{ style: { font: 'inherit' } }}
                        value={changingValue}
                        autoFocus
                        helperText={error && 'Input text required'}
                        error={error}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    <IconButton color="primary" aria-label="change name" onClick={confirm}>
                        <DoneIcon fontSize={'small'} />
                    </IconButton>
                    <IconButton color="primary" aria-label="change name" onClick={cancel}>
                        <CloseIcon fontSize={'small'} />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography fontWeight={'bold'} variant="body1">
                        {value}
                    </Typography>
                    <IconButton color="primary" aria-label="change name" onClick={setInputMode}>
                        <BorderColorIcon fontSize={'small'} />
                    </IconButton>
                </>
            )}
        </Box>
    )
}

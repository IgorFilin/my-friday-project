import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'redux/store'
import { setErrorAC } from 'redux/appReducer'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const ErrorSnackbar = React.memo(() => {
    const errorMessage = useAppSelector((state) => state.app.request.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setErrorAC(null))
    }

    return (
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
})

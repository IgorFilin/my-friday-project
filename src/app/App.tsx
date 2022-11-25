import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { initializeAppTC, RequestStatus } from 'redux/appReducer'
import { Header } from './header/Header'
import { ErrorSnackbar } from 'components/ErrorSnackbar'
import { InfoSnackbar } from 'components/InfoSnackbar'
import { AppCircularProgress } from './AppCircularProgress'
import { AppRoutes } from './AppRoutes'
import Box from '@mui/material/Box'
import { DEV_VERSION } from 'config'
import { LinearProgress } from '@mui/material'

export const App: React.FC = () => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])
    // DEV_VERSION &&
    // console.log('App render ', 'requestStatus:', requestStatus, 'isInitialized:', isInitialized)

    if (!isInitialized) return <AppCircularProgress />

    return (
        <Box>
            <Header />
            {requestStatus === RequestStatus.loading && (
                <LinearProgress sx={{ position: 'absolute', width: '100%' }} />
            )}
            <AppRoutes />
            <ErrorSnackbar />
            <InfoSnackbar />
        </Box>
    )
}

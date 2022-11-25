import React from 'react'
import { CircularProgress } from '@mui/material'

export const AppCircularProgress: React.FC<{ size?: string | number }> = ({ size }) => (
    <CircularProgress
        size={size}
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
    />
)

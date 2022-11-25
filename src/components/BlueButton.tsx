import React, { ReactNode } from 'react'
import Button from '@mui/material/Button'

type PropsType = {
    onClick?: () => void
    children: ReactNode
    disabled?: boolean
}

export const BlueButton: React.FC<PropsType> = ({ onClick, children, disabled }) => {
    return (
        <Button
            disabled={disabled}
            variant={'contained'}
            sx={{
                borderRadius: 5,
                pl: 3,
                pr: 3,
                textTransform: 'none',
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

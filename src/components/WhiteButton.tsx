import React, { ReactNode } from 'react'
import Button from '@mui/material/Button'

type PropsType = {
    onClick?: () => void
    children: ReactNode
}

export const WhiteButton: React.FC<PropsType> = ({ onClick, children }) => {
    return (
        <Button
            variant={'contained'}
            color={'inherit'}
            sx={{
                borderRadius: 5,
                backgroundColor: 'white',
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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {Path} from "../app/AppRoutes";

export const BackToPacksListButton: React.FC = () => {
    const navigate = useNavigate()
    const onClickHandler = () => navigate(Path.packsList)
    return (
        <Button onClick={onClickHandler} style={{ textTransform: 'none' }}>
            <KeyboardBackspaceIcon />
            Back to Packs List
        </Button>
    )
}

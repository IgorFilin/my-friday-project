import React from 'react'
import { useAppSelector } from 'redux/store'
import catAvatar from 'assets/cat.jpg'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const HeaderAvatar: React.FC = () => {
    const { name, avatar } = useAppSelector((state) => state.auth.profileData)
    let navigate = useNavigate()
    const onClickHandler = () => navigate('/profile')

    return (
        <Box display={'flex'} alignItems={'center'}>
            <Button
                sx={{ textTransform: 'none', textDecorationLine: 'underline' }}
                onClick={onClickHandler}
            >
                {name}
            </Button>
            <Avatar
                sx={{ ml: 1, width: 36, height: 36 }}
                alt="header avatar"
                src={avatar ?? catAvatar}
            />
        </Box>
    )
}

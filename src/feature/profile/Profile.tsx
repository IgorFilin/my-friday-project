import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import defaultAvatar from 'assets/cat.jpg'
import {changeProfileDataTC} from 'redux/authReducer'
import {RequestStatus} from 'redux/appReducer'
import {useAppDispatch, useAppSelector} from 'redux/store'
import {LogoutButton} from './LogoutButton'
import {UserAvatar} from './UserAvatar'
import {UserEmail} from './UserEmail'
import {EditableUserName} from './EditableUserName'
import {Path} from "app/AppRoutes";
import {BlueButton} from "components/BlueButton";

export const Profile: React.FC = () => {
	const isLogin = useAppSelector((state) => state.auth.isLogin)
	const {name, email, avatar} = useAppSelector((state) => state.auth.profileData)
	const statusLoading = useAppSelector((state) => state.app.request.status)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
	const onChangeUserNameHandler = (name: string) => {
		dispatch(changeProfileDataTC({name}))
	}
	
	const onChangeAvatarHandler = (avatarFile: File) => {
		dispatch(changeProfileDataTC({avatarFile}))
	}
	
	if (!isLogin) return <Navigate to={Path.login}/>
	return (
		<>
			{!(statusLoading === RequestStatus.loading) && (
				<Container
					maxWidth="sm"
					sx={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
					}}
				>
					<Paper
						sx={{
							display: 'flex',
							justifyContent: 'center',
							mt: 7,
							p: 3,
							width: 400,
							height: 350,
						}}
					>
						<Stack sx={{alignItems: 'center'}}>
							<Typography fontWeight={'bold'} variant="h5">
								Personal Information
							</Typography>
							<Box marginTop={2} marginBottom={2}>
								<UserAvatar
									src={avatar ?? defaultAvatar}
									onConfirm={onChangeAvatarHandler}
								/>
							</Box>
							<EditableUserName value={name} onConfirm={onChangeUserNameHandler}/>
							<UserEmail email={email}/>
							<BlueButton onClick={() => navigate(Path.packsList)}>
								Packs list
							</BlueButton>
							<br/>
							<LogoutButton/>
						</Stack>
					</Paper>
				</Container>
			)}
		</>
	)
}

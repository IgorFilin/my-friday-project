import React, {useEffect} from 'react'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import Box from '@mui/material/Box'
import {Link, Navigate, useParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import {TableComponent} from './TableComponent'
import Stack from '@mui/material/Stack'
import {TablePaginationComponent} from '../../components/TablePaginationComponent'
import {InputSearch} from '../../components/InputSearch'
import Container from '@mui/material/Container'
import {BlueButton} from '../../components/BlueButton'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {setCardsTC} from '../../redux/decksReducer'
import {AddToPack} from './AddPoPack'
import {RequestStatus} from "../../redux/appReducer";
import {LinearProgress} from "@mui/material";

export const FriendsPack = () => {
    const dispatch = useAppDispatch()
    const decks = useAppSelector((state) => state.decks.cardsState)
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    const sort = useAppSelector((state) => state.decks.sortCards)
    const page = useAppSelector((state) => state.decks.cardsState.page)
    const pageCount = useAppSelector((state) => state.decks.cardsState.pageCount)
    const statusLoading = useAppSelector((state) => state.app.request.status)

    const {id} = useParams<'id'>()

    useEffect(() => {
        id && dispatch(setCardsTC(id, ''))
    }, [sort, pageCount, page])

    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }
    const handleRequest = (param: string) => {
        id && dispatch(setCardsTC(id, param))
    }

    return (
        <>{statusLoading === RequestStatus.loading ? (
            <LinearProgress />
        ) : (
            <>
                {!decks.cards.length ? (
                    <AddToPack/>
                ) : (
                    <Container style={{maxWidth: '1000px'}}>
                        <Box style={{width: '100%', margin: '24px auto'}}>
                            <Link to={'/packslist'} style={{textDecoration: 'none', color: 'black'}}>
                                <KeyboardReturnRoundedIcon sx={{mt: 2}}/> Back to Packs List
                            </Link>
                        </Box>
                        <Box
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography
                                variant={'h6'}
                                style={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '27px',
                                }}
                            >
                                Friend’s Pack
                                <BlueButton onClick={()=>{alert('in progress')}}>Learn to pack</BlueButton>
                            </Typography>
                        </Box>
                        <InputSearch handleRequest={handleRequest}/>
                        <TableComponent/>
                        <Stack sx={{width: '100%', margin: '0 auto'}} spacing={2}></Stack>
                        <TablePaginationComponent/>
                    </Container>
                )}
            </>
            )}
        </>
    )
}

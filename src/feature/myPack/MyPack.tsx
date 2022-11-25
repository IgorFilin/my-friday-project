import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { Navigate, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Path } from 'app/AppRoutes'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { BlueButton } from 'components/BlueButton'
import { CardsTable } from 'components/CardsTable'
import { CardsPagination } from 'components/CardsPagination'
import { MyPackButtonWithMenu } from './MyPackButtonWithMenu'
import { createCardTC, fetchCardsTC } from 'redux/cardsReducer'
import { setErrorAC } from 'redux/appReducer'
import { CardsSearchInput } from 'components/CardsSearchInput'

export const MyPack: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    const userId = useAppSelector((state) => state.auth.profileData.id)
    const cardsState = useAppSelector((state) => state.cards)
    const dispatch = useAppDispatch()
    const { packId } = useParams()

    useEffect(() => {
        if (isLogin && packId) dispatch(fetchCardsTC(packId))
    }, [
        cardsState.sortCards,
        cardsState.page,
        cardsState.pageCount,
        cardsState.cardQuestion,
        packId,
        isLogin,
        dispatch,
    ])

    const onAddCardClickHandler = () => {
        if (!packId) return
        dispatch(
            createCardTC({ cardsPack_id: packId, answer: 'test answer', question: 'test question' })
        )
    }

    if (!isLogin) return <Navigate to={Path.login} />

    if (cardsState.packUserId !== '' && cardsState.packUserId !== userId) {
        dispatch(setErrorAC("It's not yours Cards Pack"))
        return <Navigate to={Path.packsList} />
    }

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Stack width={'100%'} sx={{ m: 3, alignItems: 'center' }}>
                <Box width={'100%'} marginBottom={2}>
                    <BackToPacksListButton />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    marginBottom={2}
                >
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography component="span" variant={'h5'}>
                            My Pack
                        </Typography>
                        <MyPackButtonWithMenu />
                    </Box>
                    <BlueButton onClick={onAddCardClickHandler}>Add new card</BlueButton>
                </Box>
                <CardsSearchInput width={'100%'} />
                <br />
                {packId && packId !== '' ? (
                    <>
                        <CardsTable
                            packId={packId}
                            rows={cardsState.cards.map((c) => ({
                                id: c._id,
                                question: c.question,
                                answer: c.answer,
                                lastUpdated: c.updated,
                                grade: c.grade,
                            }))}
                        />
                        <CardsPagination />
                    </>
                ) : (
                    <></>
                )}
            </Stack>
        </Container>
    )
}

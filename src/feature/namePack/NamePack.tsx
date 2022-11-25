import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { createTheme, ThemeProvider, Typography } from '@mui/material'
import { BlueButton } from 'components/BlueButton'




export const NamePack: React.FC = () => {

    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat, sans-serif'
        },
    });

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'flex-start',
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    display: 'flex',
                    height: '100vh',
                }}
                direction={{ sm: 'row' }}
                spacing={{ xs: 30 }}
            >
                <ThemeProvider theme={theme}>
                    <Stack sx={{ m: 3, alignItems: 'center' }}>
                        <BackToPacksListButton />
                        <Typography variant="h5">
                            Name Pack
                        </Typography>
                    </Stack>
                    <Stack sx={{
                        direction: "column",
                        alignItems: "center",
                    }}
                        pt={30}
                    >
                        <Typography sx={{
                            color: "#838383",
                        }}
                            mb={2}
                            variant="subtitle1">
                            This pack is empty. Click add new card to fill this pack
                        </Typography>
                        <BlueButton children="Add new card" />
                    </Stack>
                </ThemeProvider>
            </Stack>
        </Container >
    )
}

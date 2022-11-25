import React from 'react'
import { Button, Container, Paper, TextField } from '@mui/material'
import { InputPassword } from 'components/InputPassword/InputPassword'
import { useFormik } from 'formik'
import { singUpTC } from 'redux/authReducer'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { RequestStatus } from 'redux/appReducer'
import { Link, Navigate } from 'react-router-dom'
import { DataFormType } from 'api/api'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Registration = () => {
    const dispatch = useAppDispatch()

    const statusLoading = useAppSelector((state) => state.app.request.status)
    const isSingUpStatus = useAppSelector((state) => state.auth.isSingUp)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            currPassword: '',
        },
        onSubmit: (values) => {
            dispatch(singUpTC(values))
        },
        validate(values) {
            const errors: DataFormType = {}

            if (values.password !== values.currPassword) {
                errors.currPassword = 'Should match the password'
            } else if (!values.currPassword) {
                errors.currPassword = 'Confirm password required'
            }
            if (!values.password) {
                errors.password = 'Password required'
            } else if (values.password.length <= 7) {
                errors.password = '8 characters minimum'
            }
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
    })

    if (isSingUpStatus) {
        return <Navigate to="/login" />
    }

    //============classes============
    const errorText = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        margin: '0',
        padding: '0',
        fontWeight: 'bold',
    }

    return (
        <>
            {!(statusLoading === RequestStatus.loading) && (
                <>
                    <Container>
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '60px',
                                    width: '100%',
                                    height: '100vh',
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '413px',
                                        height: '600px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '55px',
                                            width: '80%',
                                            height: '80%',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                mt: '35px',
                                            }}
                                            fontWeight={'bold'}
                                            variant="h5"
                                        >
                                            Sing Up
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '100%',
                                                flexDirection: 'column',
                                                gap: '5px',
                                            }}
                                        >
                                            <TextField
                                                sx={{
                                                    width: '100%',
                                                    mr: '110px',
                                                }}
                                                label="Email"
                                                {...formik.getFieldProps('email')}
                                                variant="standard"
                                                value={formik.values.email}
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <Box sx={errorText}>{formik.errors.email}</Box>
                                            ) : (
                                                <br />
                                            )}

                                            <InputPassword
                                                name={'password'}
                                                title={'Password'}
                                                valuePassword={formik.values.password}
                                                onChange={formik.handleChange}
                                                restFormikProps={formik.getFieldProps('password')}
                                            />
                                            {formik.errors.password && formik.touched.password ? (
                                                <Box sx={errorText}>{formik.errors.password}</Box>
                                            ) : (
                                                <br />
                                            )}

                                            <InputPassword
                                                name={'currPassword'}
                                                title={'Confirm password'}
                                                valuePassword={formik.values.currPassword}
                                                onChange={formik.handleChange}
                                                restFormikProps={formik.getFieldProps(
                                                    'currPassword'
                                                )}
                                            />
                                            {formik.errors.currPassword &&
                                            formik.touched.currPassword ? (
                                                <Box sx={errorText}>
                                                    {formik.errors.currPassword}
                                                </Box>
                                            ) : (
                                                <br />
                                            )}
                                        </Box>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                width: '92%',
                                                borderRadius: 5,
                                                color: 'white',
                                            }}
                                        >
                                            Sing Up
                                        </Button>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'column',
                                                gap: '15px',
                                            }}
                                        >
                                            <Typography
                                                fontWeight={'bold'}
                                                variant="inherit"
                                                sx={{
                                                    color: 'grey',
                                                    margin: '0',
                                                }}
                                            >
                                                Already have an account?
                                            </Typography>
                                            <Link
                                                to="/login"
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    textDecorationLine: 'underline',
                                                    color: '#366EFF',
                                                }}
                                            >
                                                Sing In
                                            </Link>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        </form>
                    </Container>
                </>
            )}
        </>
    )
}

// @flow
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { SPACING_PADDING } from '../consts'
import Router from 'next/router'
import { authUser, getUserData, setUserData } from '../api/db'
import { Formik } from 'formik'
import FormLogin, {
    validationSchemaLoginForm,
    valuesLoginForm,
} from '../components/Form/FormLogin'
import UserContext from '../store/UserContext'
import * as R from 'ramda'
import * as V from 'voca'
import { disableBodyScroll } from 'body-scroll-lock'
import SnackBar from '../components/SnackBar'
import ShapeLoginRegister from '../components/Layout/shape'
import TextLink from '../components/TextLink'
import Layout from '../components/Layout'
import Head from 'next/head'

export const SNACKBAR_DURATION = 6000
export const BACKGROUND_COLOR = '#ff3333'

const Login = () => {
    const context = useContext(UserContext)
    const [msg, setMsg] = useState({ content: '', err: true })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        disableBodyScroll(document.querySelector('#body'))
    })

    const handleError = useCallback(
        error => {
            {
                console.log('err: ', error.response)
                if (V.isEmpty(error.response) === false) {
                    if (V.isEmpty(error.response.data.message) === false) {
                        setMsg({
                            content: error.response.data.message,
                            err: true,
                        })
                        setIsOpen(true)
                    } else {
                        setMsg({
                            content: 'An error occured!',
                            err: true,
                        })
                        setIsOpen(true)
                    }
                } else {
                    setMsg({
                        content: 'Network error',
                        err: true,
                    })
                    setIsOpen(true)
                }
            }
        },
        [setMsg, setIsOpen]
    )

    return (
        <Layout>
            <Head>
                <title>Login</title>
                <meta
                    name="login"
                    content="initial-scale=1.0, width=device-width"
                    key="login"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Nunito"
                    rel="stylesheet"
                />
            </Head>
            <Box
                style={{
                    display: 'flex',
                    flex: 0.75,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card raised style={{ height: 650, width: 650 }}>
                    <CardContent
                        style={{
                            height: '100%',
                            padding: SPACING_PADDING * 16,
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 400,
                                        fontSize: 28,
                                        letterSpacing: 2.5,
                                    }}
                                >
                                    Hey there! Welcome back.
                                </Typography>
                            </Box>
                            <Formik
                                render={props => <FormLogin {...props} />}
                                initialValues={valuesLoginForm}
                                validationSchema={validationSchemaLoginForm}
                                onSubmit={({ email, password }) => {
                                    // AUTH USER HERE
                                    authUser(email, password)
                                        .then(async res => {
                                            // GET USER DATA HERE
                                            await getUserData(
                                                res.data.token,
                                                res.data.userId
                                            )
                                                .then(res => {
                                                    localStorage.setItem(
                                                        'uid',
                                                        res.data._id
                                                    )
                                                    context.setUserData(
                                                        R.merge(
                                                            context.userData,
                                                            {
                                                                _id:
                                                                    res.data
                                                                        ._id,
                                                                userName:
                                                                    res.data
                                                                        .userName,
                                                                email:
                                                                    res.data
                                                                        .email,
                                                                password:
                                                                    res.data
                                                                        .password,
                                                            }
                                                        )
                                                    )
                                                })
                                                .catch(error =>
                                                    handleError(error)
                                                )
                                            localStorage.setItem(
                                                'token',
                                                res.data.token
                                            )
                                            // SET USER DATA HERE
                                            await setUserData(
                                                res.data.token,
                                                res.data.userId,
                                                context.userData
                                            )
                                                .then(() => {
                                                    setMsg({
                                                        content:
                                                            'Authentication succeed',
                                                        err: false,
                                                    })
                                                    setIsOpen(true)
                                                    Router.push('/home')
                                                })
                                                .catch(error =>
                                                    handleError(error)
                                                )
                                        })
                                        .catch(error => handleError(error))
                                    //END AUTH USER
                                }}
                            />
                            <TextLink
                                content="Don't have an account ? Register here"
                                onClick={() => {
                                    Router.push('/register')
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Box
                    style={{
                        position: 'fixed',
                    }}
                >
                    <SnackBar
                        open={isOpen}
                        msg={msg}
                        onClose={() => {
                            setIsOpen(false)
                        }}
                    />
                </Box>
            </Box>
            <ShapeLoginRegister />
        </Layout>
    )
}

export default Login

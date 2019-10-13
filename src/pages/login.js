// @flow
import React, { useContext, useState } from 'react'
import { Card, CardContent, Link, Snackbar } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { SPACING_PADDING } from '../consts'
import Router from 'next/router'
import Layout from '../components/Layout'
import Head from 'next/dist/next-server/lib/head'
import { authUser, getUserData, setUserData } from '../api/db'
import { Formik } from 'formik'
import FormLogin, {
    validationSchemaLoginForm,
    valuesLoginForm,
} from '../components/Form/FormLogin'
import { makeStyles } from '@material-ui/styles'
import { red, green } from '@material-ui/core/colors'
import UserContext from '../store/UserContext'
import clsx from 'clsx'
import * as R from 'ramda'
import * as V from 'voca'

export const SNACKBAR_DURATION = 10000

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: green[500],
    },
    failure: {
        backgroundColor: red[500],
    },
}))

const Login = () => {
    const classes = useStyles()
    const context = useContext(UserContext)
    const [msg, setMsg] = useState({ content: '', err: true })
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Layout>
            <Head>
                <title>Login</title>
                <meta
                    name="login"
                    content="initial-scale=1.0, width=device-width"
                    key="login"
                />
            </Head>
            <Card raised style={{ height: 650, width: 650 }}>
                <CardContent
                    style={{ height: '100%', padding: SPACING_PADDING * 16 }}
                >
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingLeft: SPACING_PADDING * 3,
                            }}
                        >
                            <img
                                src={require('../assets/rmit-logo.png')}
                                height={120}
                                width={320}
                            />
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
                                                context.setUserData(
                                                    R.merge(context.userData, {
                                                        _id: res.data._id,
                                                        userName:
                                                            res.data.userName,
                                                        email: res.data.email,
                                                        password:
                                                            res.data.password,
                                                    })
                                                )
                                            })
                                            .catch(error => {
                                                if (
                                                    V.isEmpty(
                                                        error.response.data
                                                            .message
                                                    ) === false
                                                ) {
                                                    setMsg({
                                                        content:
                                                            error.response.data
                                                                .message,
                                                        err: true,
                                                    })
                                                    setIsOpen(true)
                                                } else {
                                                    throw error
                                                }
                                            })
                                        context.setToken(res.data.token)
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
                                            .catch(error => {
                                                if (
                                                    V.isEmpty(
                                                        error.response.data
                                                            .message
                                                    ) === false
                                                ) {
                                                    setMsg({
                                                        content:
                                                            error.response.data
                                                                .message,
                                                        err: true,
                                                    })
                                                    setIsOpen(true)
                                                } else {
                                                    setMsg({
                                                        content:
                                                            'An error occured!',
                                                        err: true,
                                                    })
                                                    setIsOpen(true)
                                                }
                                            })
                                    })
                                    .catch(error => {
                                        if (
                                            V.isEmpty(
                                                error.response.data.message
                                            ) === false
                                        ) {
                                            setMsg({
                                                content:
                                                    error.response.data.message,
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
                                    })
                                //END AUTH USER
                            }}
                        />
                        <Link
                            component="button"
                            variant="body2"
                            style={{ marginTop: SPACING_PADDING * 2 }}
                            onClick={() => {
                                Router.push('/register')
                            }}
                        >
                            Don't have an account ? Register here
                        </Link>
                    </Box>
                </CardContent>
            </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={isOpen}
                autoHideDuration={SNACKBAR_DURATION}
                onClose={() => {
                    setIsOpen(false)
                }}
                ContentProps={{
                    classes: {
                        root: msg.err
                            ? clsx(classes.root, classes.failure)
                            : clsx(classes.root, classes.success),
                    },
                }}
                message={<span id="message">{msg.content}</span>}
            />
        </Layout>
    )
}

export default Login

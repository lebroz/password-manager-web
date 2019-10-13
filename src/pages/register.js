// @flow
import React, { useContext, useState } from 'react'
import { Box, Card, CardContent, Snackbar, Typography } from '@material-ui/core'
import { SPACING_PADDING } from '../consts'
import Layout from '../components/Layout'
import Router from 'next/router'
import Head from 'next/head'
import { Formik } from 'formik'
import FormRegister, {
    validationSchemaRegisterForm,
    valuesRegisterForm,
} from '../components/Form/FormRegister'
import {
    createUserPolicy,
    createUserSecret,
    createUserToken,
} from '../api/vault'
import { createUser } from '../api/db'
import UserContext from '../store/UserContext'
import * as R from 'ramda'
import { green, red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import { SNACKBAR_DURATION } from './login'
import clsx from 'clsx'
import * as V from 'voca'

const axios = require('axios').default

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

const Register = () => {
    const classes = useStyles()
    const context = useContext(UserContext)
    const [msg, setMsg] = useState({ content: '', err: true })
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Layout>
            <Head>
                <title>Register</title>
                <meta
                    name="register"
                    content="initial-scale=1.0, width=device-width"
                    key="register"
                />
            </Head>
            <Card raised style={{ height: 800, width: 650 }}>
                <CardContent
                    style={{
                        height: '100%',
                        padding: SPACING_PADDING * 8,
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: SPACING_PADDING * 8,
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                style={{ marginLeft: SPACING_PADDING * 2 }}
                                variant="h4"
                            >
                                Create an Account
                            </Typography>
                            <div
                                style={{
                                    marginTop: SPACING_PADDING * 4,
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    width: 100,
                                }}
                            />
                        </Box>
                        <Formik
                            render={props => <FormRegister {...props} />}
                            initialValues={valuesRegisterForm}
                            validationSchema={validationSchemaRegisterForm}
                            onSubmit={({
                                userName,
                                email,
                                confirmPassword,
                                password,
                            }) => {
                                // CREATE USER HERE
                                createUser(userName, email, password, '')
                                    .then(() => {
                                        // SETUP VAULT SECRET, POLICY, LEASE USER HERE
                                        axios
                                            .all([
                                                createUserSecret(userName),
                                                createUserPolicy(userName),
                                                createUserToken(userName),
                                            ])
                                            .then(
                                                axios.spread(
                                                    (secret, policy, token) => {
                                                        console.log(
                                                            'token : ',
                                                            token
                                                        )
                                                        context.setUserData(
                                                            R.merge(
                                                                context.userData,
                                                                {
                                                                    vaultToken:
                                                                        token
                                                                            .data
                                                                            .auth
                                                                            .client_token,
                                                                }
                                                            )
                                                        )
                                                        setMsg({
                                                            content:
                                                                'Account has been created!',
                                                            err: false,
                                                        })
                                                        setIsOpen(true)
                                                        Router.push('/')
                                                    }
                                                )
                                            )
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
                                // END CREATE USER
                            }}
                        />
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
                message={<span id="message-register">{msg.content}</span>}
            />
        </Layout>
    )
}

export default Register

// @flow
import React, { useState, useEffect, useCallback } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { SPACING_PADDING } from '../consts'
import Router from 'next/router'
import { Formik } from 'formik'
import FormRegister, {
    validationSchemaRegisterForm,
    valuesRegisterForm,
} from '../components/Form/FormRegister'
import { createUserPolicy, createUserSecret } from '../api/vault'
import { createUser } from '../api/db'
import * as V from 'voca'
import { disableBodyScroll } from 'body-scroll-lock'
import ShapeLoginRegister from '../components/Layout/shape'
import SnackBar from '../components/SnackBar'
import Layout from '../components/Layout'
import Head from 'next/head'

const axios = require('axios').default

const Register = () => {
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
                <title>Register</title>
                <meta
                    name="register"
                    content="initial-scale=1.0, width=device-width"
                    key="register"
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
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
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
                                    style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 400,
                                        fontSize: 28,
                                        letterSpacing: 2.5,
                                        marginLeft: SPACING_PADDING * 2,
                                    }}
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
                                                ])
                                                .then(
                                                    axios.spread(
                                                        (secret, policy) => {
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
                                        .catch(error => handleError(error))
                                    // END CREATE USER
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
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
            <ShapeLoginRegister />
        </Layout>
    )
}

export default Register

// @flow
import React, { useState, useEffect, useCallback } from 'react'
import { Box } from '@material-ui/core'
import Router from 'next/router'
import { createUserPolicy, createUserSecret } from '../api/vault'
import { createUser } from '../api/db'
import ShapeLoginRegister from '../components/Layout/shape'
import SnackBar from '../components/SnackBar'
import Layout from '../components/Layout'
import Head from 'next/head'
import { handleErrorAPI } from '../functions'
import CardRegister from '../components/Card/CardRegister'
import { disableBodyScroll } from 'body-scroll-lock'

const axios = require('axios').default

const Register = () => {
    const [msg, setMsg] = useState({ content: '', err: true })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        disableBodyScroll(document.querySelector('#body'))
    })

    const onSubmit = useCallback((userName, email, password) => {
        createUser(userName, email, password)
            .then(() => {
                axios
                    .all([
                        createUserSecret(userName),
                        createUserPolicy(userName),
                    ])
                    .then(
                        axios.spread((secret, policy) => {
                            setMsg({
                                content: 'Account has been created!',
                                err: false,
                            })
                            setIsOpen(true)
                            Router.push('/')
                        })
                    )
            })
            .catch(error => handleErrorAPI(error, setMsg, setIsOpen))
    })

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
                <CardRegister onSubmit={onSubmit} />
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

export default Register

// @flow
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Box } from '@material-ui/core'
import Router from 'next/router'
import { authUser, getUserData, setUserData } from '../api/db'
import UserContext from '../store/UserContext'
import * as R from 'ramda'
import SnackBar from '../components/SnackBar'
import ShapeLoginRegister from '../components/Layout/shape'
import Layout from '../components/Layout'
import Head from 'next/head'
import { handleErrorAPI } from '../functions'
import CardLogin from '../components/Card/CardLogin'
import { disableBodyScroll } from 'body-scroll-lock'

const Login = () => {
    const context = useContext(UserContext)
    const [msg, setMsg] = useState({ content: '', err: true })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        disableBodyScroll(document.querySelector('#body'))
    })

    const onSubmit = useCallback(
        (email, password) => {
            authUser(email, password)
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    getUserData(res.data.token, res.data.userId)
                        .then(res => {
                            localStorage.setItem('uid', res.data._id)
                            context.setUserData(
                                R.merge(context.userData, {
                                    _id: res.data._id,
                                    userName: res.data.userName,
                                    email: res.data.email,
                                    password: res.data.password,
                                })
                            )
                            const token = localStorage.getItem('token')
                            if (token != null) {
                                setUserData(
                                    token,
                                    res.data._id,
                                    context.userData
                                )
                                    .then(() => {
                                        setMsg({
                                            content: 'Authentication succeed',
                                            err: false,
                                        })
                                        setIsOpen(true)
                                        Router.push('/home')
                                    })
                                    .catch(error =>
                                        handleErrorAPI(error, setMsg, setIsOpen)
                                    )
                            }
                        })
                        .catch(error =>
                            handleErrorAPI(error, setMsg, setIsOpen)
                        )
                })
                .catch(error => handleErrorAPI(error, setMsg, setIsOpen))
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
                <CardLogin onSubmit={onSubmit} />
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

// @flow
import React from 'react'
import { Card, CardContent, TextField, Button, Link } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { SPACING_PADDING } from '../consts'
import Router from 'next/router'
import Layout from '../components/Layout'
import Head from 'next/dist/next-server/lib/head'

const Login = () => {
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
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            style={{ marginTop: SPACING_PADDING * 8 }}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            style={{
                                marginTop: SPACING_PADDING * 5,
                            }}
                            color="primary"
                            onClick={() => {
                                Router.push('/home')
                            }}
                        >
                            Login
                        </Button>
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
        </Layout>
    )
}

export default Login

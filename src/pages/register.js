// @flow
import React from 'react'
import {
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
} from '@material-ui/core'
import { SPACING_PADDING } from '../consts'
import Box from '@material-ui/core/Box'
import Layout from '../components/Layout'
import Head from 'next/head'
import Router from 'next/router'

const Register = () => {
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
            <Card raised style={{ height: 650, width: 650 }}>
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
                        <TextField
                            id="outlined-email-input"
                            label="Enter an email"
                            style={{ marginTop: SPACING_PADDING * 8 }}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Enter a password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Re-enter the password"
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
                            onClick={() => {
                                Router.push('/')
                            }}
                            color="primary"
                        >
                            Register
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Register

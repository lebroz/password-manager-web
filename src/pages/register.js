// @flow
import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { SPACING_PADDING } from '../consts'
import Layout from '../components/Layout'
import Router from 'next/router'
import Head from 'next/head'
import { Formik } from 'formik'
import FormRegister, {
    validationSchemaRegisterForm,
    valuesRegisterForm,
} from '../components/Form/FormRegister'
import { VAULT_API_TOKEN } from '../consts/vault'

const axios = require('axios').default

const submitValues = ({ userName, email, confirmPassword, password }) => {
    console.log({ userName, email, confirmPassword, password })
    axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
        },
        url: 'https://35.201.20.30:8200/v1/auth/userpass/users/' + userName,
        data: {
            password: password,
        },
    })
        .then(() => Router.push('/'))
        .catch(err => {
            console.log(err)
        })
}

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
                            onSubmit={submitValues}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Register

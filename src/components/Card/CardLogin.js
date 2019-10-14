// @flow
import React from 'react'
import { Card, CardContent, Typography, Box } from '@material-ui/core'
import { SPACING_PADDING } from '../../consts'
import { Formik } from 'formik'
import FormLogin, {
    validationSchemaLoginForm,
    valuesLoginForm,
} from '../Form/FormLogin'
import TextLink from '../TextLink'
import Router from 'next/router'

const CardLogin = ({ onSubmit }: { onSubmit: () => void }) => {
    return (
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
                            onSubmit(email, password)
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
    )
}

export default CardLogin

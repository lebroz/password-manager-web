// @flow
import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { SPACING_PADDING } from '../../consts'
import { Formik } from 'formik'
import FormRegister, {
    validationSchemaRegisterForm,
    valuesRegisterForm,
} from '../Form/FormRegister'

const CardRegister = ({ onSubmit }: { onSubmit: () => void }) => {
    return (
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
                            onSubmit(userName, email, password)
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardRegister

// @flow
import React from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import * as yup from 'yup'
import { SPACING_PADDING } from '../../consts'

export const valuesLoginForm = {
    email: '',
    password: '',
}

export const validationSchemaLoginForm = yup.object().shape({
    email: yup
        .string('Enter an email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('')
        .min(6, 'Password must contain at least 6 characters')
        .required('Enter your password'),
})

const FormLogin = props => {
    const {
        values: { email, password },
        errors,
        touched,
        handleChange,
        handleSubmit,
        isValid,
        setFieldTouched,
    } = props

    const change = (name, e) => {
        e.persist()
        handleChange(e)
        setFieldTouched(name, true, false)
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TextField
                    id="email"
                    label="Email"
                    style={{ marginTop: SPACING_PADDING * 8 }}
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && Boolean(errors.email)}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={change.bind(null, 'email')}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && Boolean(errors.password)}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={change.bind(null, 'password')}
                />
                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        marginTop: SPACING_PADDING * 5,
                    }}
                    color="primary"
                    disabled={!isValid}
                >
                    Login
                </Button>
            </Box>
        </form>
    )
}

export default FormLogin

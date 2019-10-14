// @flow
import React from 'react'
import * as yup from 'yup'
import { Box, Button, TextField } from '@material-ui/core'
import { SPACING_PADDING, BACKGROUND_COLOR } from '../../consts'

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

// $FlowFixMe
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
        setFieldTouched(name, true) //, false)
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
                    autoComplete="off"
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
                    autoComplete="off"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={change.bind(null, 'password')}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disableRipple
                    style={{
                        color: 'white',
                        marginTop: SPACING_PADDING * 5,
                        backgroundColor: BACKGROUND_COLOR,
                    }}
                    disabled={!isValid}
                >
                    Login
                </Button>
            </Box>
        </form>
    )
}

export default FormLogin

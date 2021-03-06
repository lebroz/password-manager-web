// @flow
import React from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import * as yup from 'yup'
import { SPACING_PADDING, BACKGROUND_COLOR } from '../../consts'

export const valuesRegisterForm = {
    userName: '',
    email: '',
    confirmPassword: '',
    password: '',
}

export const validationSchemaRegisterForm = yup.object().shape({
    userName: yup.string('Enter an username').required('Username is required'),
    email: yup
        .string('Enter an email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('')
        .min(6, 'Password must contain at least 6 characters')
        .required('Enter your password'),
    confirmPassword: yup
        .string('Enter your password')
        .min(6, 'Password must contain at least 6 characters')
        .oneOf([yup.ref('password')], 'Password does not match')
        .required('Confirm your password'),
})

// $FlowFixMe
const FormRegister = props => {
    const {
        values: { userName, email, password, confirmPassword },
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
                    id="userName"
                    label="Username"
                    style={{ marginTop: SPACING_PADDING * 8 }}
                    helperText={touched.userName ? errors.userName : ''}
                    error={touched.userName && Boolean(errors.userName)}
                    name="userName"
                    autoComplete="off"
                    margin="normal"
                    variant="outlined"
                    value={userName}
                    onChange={change.bind(null, 'userName')}
                />
                <TextField
                    id="email"
                    label="Email"
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
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    helperText={
                        touched.confirmPassword ? errors.confirmPassword : ''
                    }
                    error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                    }
                    name="confirmPassword"
                    autoComplete="off"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={change.bind(null, 'confirmPassword')}
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
                    color="primary"
                    disabled={!isValid}
                >
                    Register
                </Button>
            </Box>
        </form>
    )
}

export default FormRegister

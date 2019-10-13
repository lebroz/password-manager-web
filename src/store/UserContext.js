// @flow
import React, { createContext } from 'react'

const UserContext = createContext({
    token: '',
    userData: {
        _id: '',
        userName: '',
        email: '',
        password: '',
        vaultToken: '',
    },
    setToken(token) {
        this.token = token
    },
    setUserData(userData) {
        this.userData = { ...this.userData, ...userData }
    },
})

export default UserContext

// @flow
import React, { createContext } from 'react'

// $FlowFixMe
const UserContext = createContext({
    userData: {
        _id: '',
        userName: '',
        email: '',
        password: '',
    },
    setUserData(userData) {
        this.userData = { ...this.userData, ...userData }
    },
})

export default UserContext

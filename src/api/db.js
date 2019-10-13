// @flow
import { VAULT_API_TOKEN } from '../consts/vault'

const https = require('https')
const axios = require('axios').default

const BASE_URL = 'http://127.0.0.1:60000/'
const agent = new https.Agent({
    rejectUnauthorized: false,
})

export function createUser(
    userName: string,
    email: string,
    password: string,
    vaultToken: string
) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'users',
        data: {
            userName: userName,
            email: email,
            password: password,
            vaultToken: vaultToken,
        },
    })
}

export function getUserData(token: string, id: string) {
    return axios({
        method: 'get',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'users/' + id,
    })
}

export function setUserData(token: string, id: string, data: Object) {
    return axios({
        method: 'put',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'users/' + id,
        data: data,
    })
}

export function authUser(email: string, password: string) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'authenticate',
        data: {
            email,
            password,
        },
    })
}

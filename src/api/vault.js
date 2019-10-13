// @flow
import { VAULT_API_TOKEN } from '../consts/vault'

const https = require('https')
const axios = require('axios').default
const BASE_URL = 'https://35.201.20.30:8200/v1/'
const agent = new https.Agent({
    rejectUnauthorized: false,
})

export function createUserSecret(userName: string) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'secret/' + userName,
        data: {
            userName: `${userName}`,
        },
    })
}

export function createUserPolicy(userName: string) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'sys/policy/' + userName,
        data: {
            policy: `path "secret/${userName}" {\n\tcapabilities = [ "create", "update", "read" ]\n}`,
        },
    })
}

export function createUserToken(userName: string) {
    return axios({
        method: 'put',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'auth/token/create',
        data: {
            policies: ['default', `${userName}`],
            display_name: `${userName}_token`,
        },
    })
}

export function revokeUserToken(userName: string) {
    return axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
        },
        url: BASE_URL + 'auth/token/revoke',
        data: {
            token: 'TOKEN_ICI',
        },
    })
}

export function getUserSecrets(userName: string, token: string) {
    return axios({
        method: 'get',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'secret/' + userName,
    })
}

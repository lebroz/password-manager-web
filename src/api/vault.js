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

export function deleteUserSecret(id: string, token: string) {
    return axios({
        method: 'delete',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'secret/' + id,
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
        },
    })
}

export function revokeUserToken(token: string) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + VAULT_API_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'auth/token/revoke',
        data: {
            token: token,
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

export function updateUserSecrets(
    userName: string,
    token: string,
    data: Object
) {
    return axios({
        method: 'post',
        mode: 'no-cors',
        httpsAgent: agent,
        headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'secret/' + userName,
        data: data,
    })
}

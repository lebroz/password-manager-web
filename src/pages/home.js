// @flow
import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import UserContext from '../store/UserContext'
import { getUserSecrets } from '../api/vault'

const Home = () => {
    const context = useContext(UserContext)
    useEffect(() => {
        getUserSecrets(context.userData.userName, context.userData.vaultToken)
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log(error))
    }, [context])
    console.log('oiu: ', context.token)
    console.log('oiu: ', context.userData)
    return (
        <Layout>
            <Head>
                <title>Home</title>
                <meta
                    name="home"
                    content="initial-scale=1.0, width=device-width"
                    key="home"
                />
            </Head>
            <div>Welcome to the Homepage</div>
        </Layout>
    )
}

export default Home

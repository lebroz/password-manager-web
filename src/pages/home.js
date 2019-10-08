// @flow
import React from 'react'
import Head from "next/head";
import Layout from "../components/Layout";

const Home = () => {
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

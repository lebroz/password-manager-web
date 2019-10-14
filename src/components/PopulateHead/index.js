// @flow
import React from 'react'
import Head from 'next/head'

const PopulateHead = ({ title }: { title: string }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name={title}
                content="initial-scale=1.0, width=device-width"
                key={title}
            />
            <link
                href="https://fonts.googleapis.com/css?family=Nunito"
                rel="stylesheet"
            />
        </Head>
    )
}

export default PopulateHead

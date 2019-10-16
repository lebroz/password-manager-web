// @flow
import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
    useLayoutEffect,
} from 'react'
import Layout from '../components/Layout'
import UserContext from '../store/UserContext'
import {
    createUserToken,
    getUserSecrets,
    updateUserSecrets,
} from '../api/vault'
import { getUserData } from '../api/db'
import { Box, CircularProgress, GridList } from '@material-ui/core'
import { SPACING_PADDING, BACKGROUND_COLOR } from '../consts'
import Head from 'next/head'
import Header from '../components/Header'
import FloatButton from '../components/FloatButton'
import * as R from 'ramda'
import CardSecret from '../components/Card/CardSecret'
import DialogSecret from '../components/Dialog/DialogSecret'
import DialogAdd from '../components/Dialog/DialogAdd'
import DialogEdit from '../components/Dialog/DialogEdit'
import DialogAlert from '../components/Dialog'

const Home = () => {
    const context = useContext(UserContext)
    const [isAlertOpen, setIsAlertOpen] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(null)
    const [newEditSecret, setEditSecret] = useState(null)
    const [newTitleSecret, setNewTitleSecret] = useState(null)
    const [newSecret, setNewSecret] = useState(null)
    const [secrets, setSecrets] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isCardOpen, setIsCardOpen] = useState(false)
    const [card, setCard] = useState({ key: '', name: '' })
    const [width, setWidth] = useState(0)

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize)
        window.removeEventListener('resize', updateSize)
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        if (token != null && uid != null) {
            getUserData(token, uid)
                .then(res => {
                    context.setUserData(res.data)
                })
                .then(() => {
                    if (localStorage.getItem('vault-token') == null) {
                        createUserToken(context.userData.userName)
                            .then(res => {
                                localStorage.setItem(
                                    'vault-token',
                                    res.data.auth.client_token
                                )
                            })
                            .then(() => {
                                const vaultToken = localStorage.getItem(
                                    'vault-token'
                                )
                                if (vaultToken != null) {
                                    getUserSecrets(
                                        context.userData.userName,
                                        vaultToken
                                    ).then(res => {
                                        setSecrets(res.data.data)
                                    })
                                }
                            })
                            .catch(error => console.log(error))
                    } else {
                        const vaultToken = localStorage.getItem('vault-token')
                        if (vaultToken != null) {
                            getUserSecrets(
                                context.userData.userName,
                                vaultToken
                            )
                                .then(res => {
                                    setSecrets(res.data.data)
                                })
                                .catch(error => console.log(error))
                        }
                    }
                })
                .catch(error => console.log(error))
        }
    }, [context])

    const handleDelete = useCallback(event => {
        const vaultToken = localStorage.getItem('vault-token')
        const newState = R.omit([event.currentTarget.id], secrets)
        if (vaultToken != null) {
            updateUserSecrets(context.userData.userName, vaultToken, newState)
                .then(() => {
                    setSecrets(newState)
                })
                .catch(error => console.log(error))
        }
    })

    const handleDisplay = useCallback(event => {
        setCard({
            key: event.currentTarget.id,
            value: event.currentTarget.name,
        })
        setIsCardOpen(true)
    })

    const handleEdit = useCallback(
        event => {
            setCard({
                key: event.currentTarget.id,
                value: event.currentTarget.name,
            })
            setIsEditOpen(true)
        },
        [setIsEditOpen]
    )

    return (
        <Layout>
            <Head>
                <title>Home</title>
                <meta
                    name="home"
                    content="initial-scale=1.0, width=device-width"
                    key="home"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Nunito"
                    rel="stylesheet"
                />
            </Head>
            <Header title="Vault" />
            <>
                {secrets != null ? (
                    <>
                        <GridList
                            cellHeight={220}
                            cols={Math.ceil(width / 250)}
                            style={{
                                width: '100%',
                                alignContent: 'flex-start',
                                marginTop: SPACING_PADDING * 10,
                                padding: SPACING_PADDING * 2,
                            }}
                        >
                            {Object.keys(secrets).map(key => (
                                <Box
                                    key={key}
                                    style={{
                                        padding: SPACING_PADDING * 2,
                                    }}
                                >
                                    <CardSecret
                                        keyId={key}
                                        secrets={secrets}
                                        handleDisplay={handleDisplay}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                    />
                                </Box>
                            ))}
                        </GridList>
                    </>
                ) : (
                    <Layout>
                        <Box
                            style={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress
                                style={{ color: BACKGROUND_COLOR }}
                            />
                        </Box>
                    </Layout>
                )}
            </>
            <FloatButton
                onClick={() => {
                    setIsOpen(true)
                }}
            />
            <DialogAdd
                isOpen={isOpen}
                setNewTitleSecret={setNewTitleSecret}
                setNewSecret={setNewSecret}
                onClose={() => {
                    setIsOpen(false)
                }}
                onSubmit={() => {
                    setIsOpen(false)
                    const vaultToken = localStorage.getItem('vault-token')
                    if (newTitleSecret != null && vaultToken != null) {
                        getUserSecrets(context.userData.userName, vaultToken)
                            .then(res => {
                                const data = res.data.data
                                if (
                                    data.hasOwnProperty(newTitleSecret) ===
                                    false
                                ) {
                                    updateUserSecrets(
                                        context.userData.userName,
                                        vaultToken,
                                        {
                                            ...secrets,
                                            [newTitleSecret]: newSecret,
                                        }
                                    ).then(res => {
                                        setSecrets({
                                            ...secrets,
                                            [newTitleSecret]: newSecret,
                                        })
                                    })
                                } else {
                                    setIsAlertOpen(true)
                                }
                            })
                            .catch(error => console.log(error))
                    }
                }}
            />
            <DialogSecret
                isCardOpen={isCardOpen}
                onClose={() => {
                    setIsCardOpen(false)
                }}
                card={card}
            />
            <DialogEdit
                isOpen={isEditOpen}
                card={card}
                setEditSecret={setEditSecret}
                onClose={() => setIsEditOpen(false)}
                onSubmit={() => {
                    setIsEditOpen(false)
                    const vaultToken = localStorage.getItem('vault-token')
                    if (newEditSecret != null && vaultToken != null) {
                        getUserSecrets(context.userData.userName, vaultToken)
                            .then(res => {
                                const data = res.data.data
                                if (data.hasOwnProperty(card.key)) {
                                    updateUserSecrets(
                                        context.userData.userName,
                                        vaultToken,
                                        {
                                            ...secrets,
                                            [card.key]: newEditSecret,
                                        }
                                    ).then(res => {
                                        setSecrets({
                                            ...secrets,
                                            [card.key]: newEditSecret,
                                        })
                                    })
                                }
                            })
                            .catch(error => console.log(error))
                    }
                }}
            />
            <DialogAlert
                isAlertOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                text={newTitleSecret}
            />
        </Layout>
    )
}

export default Home

// @flow
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import UserContext from '../store/UserContext'
import {
    createUserToken,
    getUserSecrets,
    updateUserSecrets,
} from '../api/vault'
import { getUserData } from '../api/db'
import {
    Box,
    Typography,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    DialogActions,
    GridList,
    CircularProgress,
} from '@material-ui/core'
import { SPACING_PADDING } from '../consts'
import { makeStyles } from '@material-ui/core/styles'
import Delete from '@material-ui/icons/DeleteOutlineRounded'
import Edit from '@material-ui/icons/Edit'
import Detail from '@material-ui/icons/Details'
import Head from 'next/head'
import Header from '../components/Header'
import FloatButton from '../components/FloatButton'
import { BACKGROUND_COLOR } from './login'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const Home = () => {
    const context = useContext(UserContext)
    const classes = useStyles()
    const [newTitleSecret, setNewTitleSecret] = useState(null)
    const [newSecret, setNewSecret] = useState(null)
    const [secrets, setSecrets] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        getUserData(localStorage.getItem('token'), localStorage.getItem('uid'))
            .then(res => {
                context.setUserData(res.data)
            })
            .then(() => {
                if (localStorage.getItem('vault-token') == null) {
                    createUserToken(
                        context.userData.userName,
                        context.userData._id
                    )
                        .then(res => {
                            localStorage.setItem(
                                'vault-token',
                                res.data.auth.client_token
                            )
                        })
                        .then(() => {
                            getUserSecrets(
                                context.userData.userName,
                                localStorage.getItem('vault-token')
                            ).then(res => {
                                setSecrets(res.data.data)
                            })
                        })
                        .catch(error => console.log(error))
                } else {
                    getUserSecrets(
                        context.userData.userName,
                        localStorage.getItem('vault-token')
                    )
                        .then(res => {
                            setSecrets(res.data.data)
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }, [context])

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
                            cols={4}
                            style={{
                                marginTop: SPACING_PADDING * 10,
                                marginLeft: SPACING_PADDING * 3,
                            }}
                        >
                            {Object.keys(secrets).map(key => (
                                <Box
                                    key={key}
                                    style={{
                                        padding: 16,
                                    }}
                                >
                                    <Card
                                        raised
                                        style={{
                                            height: 190,
                                            width: 200,
                                            borderRadius: 25,
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <Detail />
                                                    <Typography
                                                        style={{
                                                            marginTop: SPACING_PADDING,
                                                            fontFamily:
                                                                'Nunito',
                                                            textTransform:
                                                                'uppercase',
                                                            letterSpacing: -0.25,
                                                            fontWeight: 600,
                                                            color: BACKGROUND_COLOR,
                                                        }}
                                                    >
                                                        {key}
                                                    </Typography>
                                                    <div
                                                        style={{
                                                            marginTop: SPACING_PADDING,
                                                            borderStyle:
                                                                'solid',
                                                            borderWidth: '1px',
                                                            borderColor: BACKGROUND_COLOR,
                                                            width: 150,
                                                        }}
                                                    />
                                                    <Typography
                                                        style={{
                                                            marginTop:
                                                                SPACING_PADDING *
                                                                2,
                                                            fontFamily:
                                                                'Nunito',
                                                            letterSpacing: -0.25,
                                                            fontWeight: 600,
                                                            color: '#999999',
                                                        }}
                                                    >
                                                        Value: {secrets[key]}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        marginTop:
                                                            SPACING_PADDING * 4,
                                                        marginBottom:
                                                            SPACING_PADDING * 2,
                                                    }}
                                                >
                                                    <Delete
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: BACKGROUND_COLOR,
                                                            marginRight:
                                                                SPACING_PADDING *
                                                                5,
                                                        }}
                                                        onClick={() => {
                                                            console.log('oui')
                                                        }}
                                                    />
                                                    <Edit
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: BACKGROUND_COLOR,
                                                            marginLeft:
                                                                SPACING_PADDING *
                                                                5,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </GridList>
                        <FloatButton
                            onClick={() => {
                                setIsOpen(true)
                            }}
                        />
                    </>
                ) : (
                    <Layout>
                        <CircularProgress className={classes.progress} />
                    </Layout>
                )}
            </>
            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
            >
                <DialogTitle id="form-dialog-title">Secret</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new secret in your vault
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name-secret"
                        label="Name secret"
                        fullWidth
                        onChange={e => {
                            setNewTitleSecret(e.target.value)
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="value-secret"
                        label="Value secret"
                        fullWidth
                        onChange={e => {
                            setNewSecret(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                            setNewSecret(null)
                            setNewTitleSecret(null)
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                            updateUserSecrets(
                                context.userData.userName,
                                localStorage.getItem('vault-token'),
                                { ...secrets, [newTitleSecret]: newSecret }
                            ).then(res => {
                                console.log(res)
                                setSecrets({
                                    ...secrets,
                                    [newTitleSecret]: newSecret,
                                })
                                setNewSecret(null)
                                setNewTitleSecret(null)
                            })
                        }}
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}

export default Home

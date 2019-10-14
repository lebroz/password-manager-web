// @flow
import React, { useContext, useState } from 'react'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { revokeUserToken } from '../../api/vault'
import UserContext from '../../store/UserContext'
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { BACKGROUND_COLOR } from '../../pages/login'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { SPACING_PADDING } from '../../consts'

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: SPACING_PADDING * 2,
        flexGrow: 1,
    },
}))

const Header = ({ title }: { title: string }) => {
    const classes = useStyles()
    const context = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [auth, setAuth] = useState(true)

    const handleChange = event => {
        setAuth(event.target.checked)
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogOut = () => {
        revokeUserToken(localStorage.getItem('vault-token')).then(() => {
            localStorage.removeItem('uid')
            localStorage.removeItem('token')
            localStorage.removeItem('vault-token')
            Router.push('/')
        })
    }

    return (
        <AppBar
            style={{
                backgroundColor: BACKGROUND_COLOR,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}
        >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {auth && (
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            style={{
                                fontFamily: 'Nunito',
                                fontWeight: 600,
                                fontSize: 14,
                                letterSpacing: 0.75,
                            }}
                        >
                            Hello, {context.userData.userName}
                        </Typography>
                        <IconButton onClick={handleMenu} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                                My account
                            </MenuItem>
                            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header

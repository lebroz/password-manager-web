// @flow
import React, { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { green, red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { SNACKBAR_DURATION } from '../../consts'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: green[500],
    },
    failure: {
        backgroundColor: red[500],
    },
}))

const SnackBar = ({
    open,
    msg,
    onClose,
}: {
    open: boolean,
    msg: Object,
    onClose: () => void,
}) => {
    const classes = useStyles()
    const [wHeight, setWHeight] = useState(null)

    useEffect(() => {
        setWHeight(window.innerHeight)
    })

    return wHeight != null ? (
        <Snackbar
            style={{
                position: 'relative',
                bottom: -(wHeight / 2 - 60),
            }}
            open={open}
            autoHideDuration={SNACKBAR_DURATION}
            onClose={onClose}
            ContentProps={{
                classes: {
                    root: msg.err
                        ? clsx(classes.root, classes.failure)
                        : clsx(classes.root, classes.success),
                },
            }}
            message={<span id="message">{msg.content}</span>}
        />
    ) : null
}

export default SnackBar

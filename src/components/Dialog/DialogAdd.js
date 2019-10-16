// @flow
import React from 'react'
import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
} from '@material-ui/core'
import { StyledDialog } from './index'
import { BACKGROUND_COLOR, SPACING_PADDING } from '../../consts'

const DialogAdd = ({
    isOpen,
    setNewTitleSecret,
    setNewSecret,
    onClose,
    onSubmit,
}: {
    isOpen: boolean,
    setNewTitleSecret: () => void,
    setNewSecret: () => void,
    onClose: () => void,
    onSubmit: () => void,
}) => {
    return (
        <StyledDialog open={isOpen} onClose={onClose}>
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
                    autoFocus
                    autoComplete="off"
                    onChange={e => {
                        setNewTitleSecret(e.target.value)
                    }}
                />
                <TextField
                    margin="dense"
                    id="value-secret"
                    label="Value secret"
                    fullWidth
                    autoComplete="off"
                    onChange={e => {
                        setNewSecret(e.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disableRipple
                    onClick={onClose}
                    color="primary"
                    style={{
                        color: BACKGROUND_COLOR,
                        marginRight: SPACING_PADDING,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    disableRipple
                    onClick={onSubmit}
                    color="primary"
                    style={{
                        color: BACKGROUND_COLOR,
                        marginRight: SPACING_PADDING,
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default DialogAdd

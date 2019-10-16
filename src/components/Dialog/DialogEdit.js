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
import { TextInline } from '../Typography'

const DialogEdit = ({
    isOpen,
    card,
    setEditSecret,
    onClose,
    onSubmit,
}: {
    isOpen: boolean,
    card: Object,
    setEditSecret: () => void,
    onClose: () => void,
    onSubmit: () => void,
}) => {
    return (
        <StyledDialog open={isOpen} onClose={onClose}>
            <DialogTitle id="form-dialog-title">Edit Secret</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The secret you will edit is :{' '}
                    <TextInline
                        style={{ fontSize: 16, color: BACKGROUND_COLOR }}
                    >
                        {card.key}
                    </TextInline>
                </DialogContentText>
                <TextField
                    margin="dense"
                    value={card.value}
                    id="edit-secret"
                    label="New secret"
                    fullWidth
                    autoFocus
                    autoComplete="off"
                    onChange={e => {
                        setEditSecret(e.target.value)
                    }}
                    style={{
                        color: BACKGROUND_COLOR,
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
                    Edit
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default DialogEdit

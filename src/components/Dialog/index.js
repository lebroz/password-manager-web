// @flow
import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import { BACKGROUND_COLOR, SPACING_PADDING } from '../../consts'
import { withStyles } from '@material-ui/core/styles'
import { TextCardSubtitle, TextCardTitle, TextInline } from '../Typography'

export const StyledDialog = withStyles({
    paper: {
        borderRadius: 25,
        padding: SPACING_PADDING * 3,
    },
})(Dialog)

const DialogAlert = ({
    isAlertOpen,
    onClose,
    text,
}: {
    isAlertOpen: boolean,
    onClose: () => void,
    text: string,
}) => {
    return (
        <StyledDialog open={isAlertOpen} onClose={onClose}>
            <DialogTitle id="simple-dialog-title">
                <TextCardTitle>Error</TextCardTitle>
            </DialogTitle>
            <DialogContent>
                <TextCardSubtitle
                    style={{ letterSpacing: 1.5, fontWeight: 400 }}
                >
                    <TextInline
                        style={{
                            fontWeight: 600,
                            letterSpacing: 2.5,
                            color: BACKGROUND_COLOR,
                        }}
                    >
                        {text + ' '}
                    </TextInline>
                    already exist, please use a name that doesn't exist
                </TextCardSubtitle>
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
                    Close
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default DialogAlert

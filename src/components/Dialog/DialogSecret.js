// @flow
import React from 'react'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import { TextCardSubtitle, TextCardTitle, TextInline } from '../Typography'
import { BACKGROUND_COLOR, SPACING_PADDING } from '../../consts'
import { StyledDialog } from './index'

const DialogSecret = ({
    isCardOpen,
    onClose,
    card,
}: {
    isCardOpen: boolean,
    onClose: () => void,
    card: Object,
}) => {
    return (
        <StyledDialog open={isCardOpen} onClose={onClose}>
            <DialogTitle id="simple-dialog-title">
                <TextCardTitle>Secret content</TextCardTitle>
            </DialogTitle>
            <DialogContent>
                <TextCardSubtitle
                    style={{ letterSpacing: 1.5, fontWeight: 400 }}
                >
                    Key :
                    <TextInline
                        style={{
                            marginLeft: SPACING_PADDING * 4,
                            fontWeight: 600,
                            letterSpacing: 2.5,
                            color: BACKGROUND_COLOR,
                        }}
                    >
                        {card.key}
                    </TextInline>
                </TextCardSubtitle>
                <TextCardSubtitle
                    style={{ letterSpacing: 1.5, fontWeight: 400 }}
                >
                    Value :
                    <TextInline
                        style={{
                            marginLeft: SPACING_PADDING * 2,
                            fontWeight: 600,
                            letterSpacing: 2.5,
                            color: BACKGROUND_COLOR,
                        }}
                    >
                        {card.value}
                    </TextInline>
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

export default DialogSecret

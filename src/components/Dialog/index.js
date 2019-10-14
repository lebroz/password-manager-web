// @flow
import React from 'react'
import { Dialog } from '@material-ui/core'
import { SPACING_PADDING } from '../../consts'
import { withStyles } from '@material-ui/core/styles'

export const StyledDialog = withStyles({
    paper: {
        borderRadius: 25,
        padding: SPACING_PADDING * 3,
    },
})(Dialog)

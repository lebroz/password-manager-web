// @flow
import React, { type Node } from 'react'
import { Typography } from '@material-ui/core'
import { SPACING_PADDING, BACKGROUND_COLOR } from '../../consts'

export const TextCardTitle = ({
    children,
    style,
}: {
    children: Node,
    style: Object,
}) => {
    return (
        <Typography
            style={{
                marginTop: SPACING_PADDING,
                fontFamily: 'Nunito',
                textTransform: 'uppercase',
                letterSpacing: 2.25,
                fontWeight: 700,
                color: BACKGROUND_COLOR,
                ...style,
            }}
        >
            {children}
        </Typography>
    )
}

export const TextCardSubtitle = ({
    children,
    style,
}: {
    children: Node,
    style?: Object,
}) => {
    return (
        <Typography
            style={{
                marginTop: SPACING_PADDING * 2,
                fontFamily: 'Nunito',
                letterSpacing: -0.25,
                fontWeight: 600,
                color: '#999999',
                ...style,
            }}
        >
            {children}
        </Typography>
    )
}

export const TextInline = ({
    children,
    style,
}: {
    children: Node,
    style: Object,
}) => {
    return (
        <span
            style={{
                marginTop: SPACING_PADDING,
                fontFamily: 'Nunito',
                letterSpacing: -0.25,
                fontWeight: 400,
                color: '#999999',
                ...style,
            }}
        >
            {children}
        </span>
    )
}

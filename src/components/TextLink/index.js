// @flow
import React from 'react'
import { SPACING_PADDING } from '../../consts'
import { BACKGROUND_COLOR } from '../../pages/login'
import { Link } from '@material-ui/core'

const TextLink = ({
    content,
    onClick,
    style,
}: {
    content: string,
    onClick: () => void,
    style?: Object,
}) => {
    return (
        <Link
            component="button"
            variant="body2"
            style={{
                marginTop: SPACING_PADDING * 2,
                color: BACKGROUND_COLOR,
                ...style,
            }}
            onClick={onClick}
        >
            {content}
        </Link>
    )
}

export default TextLink

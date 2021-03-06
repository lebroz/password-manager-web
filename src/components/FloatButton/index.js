// @flow
import React from 'react'
import { Fab } from '@material-ui/core'
import { BACKGROUND_COLOR } from '../../consts'
import AddIcon from '@material-ui/icons/Add'

const FloatButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Fab
            disableRipple
            style={{
                position: 'absolute',
                backgroundColor: BACKGROUND_COLOR,
                color: 'white',
                right: 40,
                bottom: 40,
            }}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    )
}

export default FloatButton

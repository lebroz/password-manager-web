// @flow
import React from 'react'
import { Box } from '@material-ui/core'
import { BACKGROUND_COLOR } from '../../pages/login'

const ShapeLoginRegister = () => {
    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 0.25,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: -130,
                    right: -30,
                    transform: 'rotate(45deg)',
                    backgroundColor: BACKGROUND_COLOR,
                    height: 400,
                    width: 200,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: -30,
                    right: -130,
                    transform: 'rotate(45deg)',
                    backgroundColor: BACKGROUND_COLOR,
                    height: 200,
                    width: 400,
                }}
            />
        </>
    )
}

export default ShapeLoginRegister

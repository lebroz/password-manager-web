// @flow
import React, { type Node } from 'react'
import { Box } from '@material-ui/core'

const Layout = ({ children }: { children: Node }) => {
    return (
        <Box
            style={{
                display: 'flex',
                flex: 1,
                minHeight: '98vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </Box>
    )
}

export default Layout

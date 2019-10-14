// @flow
import React, { type Node } from 'react'
import { Box } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

const Layout = ({ children }: { children: Node }) => {
    return (
        <Box
            style={{
                display: 'flex',
                flex: 1,
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            {children}
        </Box>
    )
}

export default Layout

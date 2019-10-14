// @flow
import React from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@material-ui/core'
import Delete from '@material-ui/icons/DeleteOutlineRounded'
import Edit from '@material-ui/icons/Edit'
import Detail from '@material-ui/icons/Details'
import { BACKGROUND_COLOR, SPACING_PADDING } from '../../consts'
import { textTruncate } from '../../functions'

const CardSecret = ({
    keyId,
    secrets,
    handleDisplay,
    handleDelete,
}: {
    keyId: string,
    secrets: Object,
    handleDisplay: () => void,
    handleDelete: () => void,
}) => {
    return (
        <Card
            raised
            style={{
                height: 190,
                width: 200,
                borderRadius: 25,
            }}
        >
            <CardActionArea
                id={keyId}
                name={secrets[keyId]}
                onClick={event => handleDisplay(event)}
            >
                <CardContent>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Detail />
                            <Typography
                                style={{
                                    marginTop: SPACING_PADDING,
                                    fontFamily: 'Nunito',
                                    textTransform: 'uppercase',
                                    letterSpacing: -0.25,
                                    fontWeight: 600,
                                    color: BACKGROUND_COLOR,
                                }}
                            >
                                {textTruncate(keyId, 10)}
                            </Typography>
                            <div
                                style={{
                                    marginTop: SPACING_PADDING,
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderColor: BACKGROUND_COLOR,
                                    width: 150,
                                }}
                            />
                            <Typography
                                style={{
                                    marginTop: SPACING_PADDING * 2,
                                    fontFamily: 'Nunito',
                                    letterSpacing: -0.25,
                                    fontWeight: 600,
                                    color: '#999999',
                                }}
                            >
                                Value: {textTruncate(secrets[keyId], 10)}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box
                    style={{
                        display: 'flex',
                        flex: 1,
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flex: 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Delete
                            id={keyId}
                            style={{
                                cursor: 'pointer',
                                color: BACKGROUND_COLOR,
                            }}
                            onClick={event => handleDelete(event)}
                        />
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            flex: 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Edit
                            style={{
                                cursor: 'pointer',
                                color: BACKGROUND_COLOR,
                            }}
                        />
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
}

export default CardSecret

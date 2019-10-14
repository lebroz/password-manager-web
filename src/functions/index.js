import * as V from 'voca'
import { ERR_DEFAULT_MESSAGE, ERR_NETWORK_ERROR } from '../consts/strings'

export const textTruncate = (str, length, ending) => {
    if (length == null) {
        length = 100
    }
    if (ending == null) {
        ending = '...'
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
    } else {
        return str
    }
}

export const handleErrorAPI = (error, setMsg, setIsOpen) => {
    if (V.isEmpty(error.response) === false) {
        if (V.isEmpty(error.response.data.message) === false) {
            setMsg({
                content: error.response.data.message,
                err: true,
            })
            setIsOpen(true)
        } else {
            setMsg({
                content: ERR_DEFAULT_MESSAGE,
                err: true,
            })
            setIsOpen(true)
        }
    } else {
        setMsg({
            content: ERR_NETWORK_ERROR,
            err: true,
        })
        setIsOpen(true)
    }
}

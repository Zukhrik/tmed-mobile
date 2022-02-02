import {useCallback, useEffect, useState} from 'react'
import {removeMessageEvent, temporaryMessageMount} from '../../Models/chat-model'
import copy from 'copy-text-to-clipboard'
import moment from 'moment'
import chat from '../../Service/chat'

export function useChatAction({partner_slug, formik, inputRef}) {
    //Local states
    const [anchorEl, setAnchorEl] = useState(null)
    const [msgInfo, setMsgInfo] = useState(null)
    const [showDelMenu, setShowDelMenu] = useState(false)

    const handleMsgClick = (event, data, me) => {
        setAnchorEl({el: event.currentTarget, me})
        setMsgInfo(data)
    }

    const handleClosePopup = () => {
        setAnchorEl(null)
        setMsgInfo(null)
    }

    useEffect(() => {
        if (!!anchorEl) {
            setShowDelMenu(false)
        }
    }, [anchorEl])


    const handleCopy = useCallback(async () => {
        if (msgInfo) {
            copy(msgInfo.text)
            setAnchorEl(null)
        }
    }, [msgInfo])

    const handleEdit = useCallback(() => {
        if (msgInfo) {
            setAnchorEl(null)
            setMsgInfo(null)
            inputRef.current.focus()
            temporaryMessageMount({type: 'edit', ...msgInfo})
            formik.setFieldValue('text', msgInfo.text)
        }
    }, [msgInfo, formik, inputRef])

    const handleReply = useCallback(() => {
        if (msgInfo) {
            temporaryMessageMount({type: 'reply', ...msgInfo})
            setAnchorEl(null)
            setMsgInfo(null)
        }
    }, [msgInfo])

    const handleCancelEditAndReply = useCallback((action) => {
        temporaryMessageMount(null)
        setMsgInfo(null)
        setShowDelMenu(false)
    }, [])

    const handleRemove = useCallback((type) => {
        if (msgInfo) {
            if (type) {
                const data = {
                    id: msgInfo.id,
                    partner: partner_slug
                }
                if (type === 'irrevocably') {
                    data['params'] = {[type]: '1'}
                }
                removeMessageEvent({
                    key: partner_slug,
                    id: msgInfo.id,
                    date: moment(msgInfo.date).format('YYYY-MM-DD')
                })
                handleClosePopup()
                temporaryMessageMount(null)

                chat.removeMessageToUser(data)
                    .then((res) => {
                        console.log(res)
                    })
            } else {
                setShowDelMenu(true)
            }
        }
    }, [partner_slug, msgInfo])

    return {
        msgInfo,
        anchorEl,
        handleCopy,
        handleEdit,
        handleReply,
        showDelMenu,
        handleRemove,
        handleMsgClick,
        handleClosePopup,
        handleCancelEditAndReply,
    }
}
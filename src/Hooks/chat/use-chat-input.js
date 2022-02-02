import {useCallback, useEffect, useRef, useState} from 'react'
import {useFormik} from 'formik'
import {$chatModel, temporaryMessageMount, userSentMessageMount, userUpdateMessageMount} from '../../Models/chat-model'
import {v4 as uuidV4} from 'uuid'
import moment from 'moment'
import {useStore} from 'effector-react'
import {$accountModel} from '../../Models/account-model'
import {useOutsideClicker} from '../app/use-outside-clicker'
import {useTranslation} from 'react-i18next'

export function useChatInput({partner_slug}) {
    const {t} = useTranslation()
    const {$temporaryMessage: tmpMsg} = useStore($chatModel)
    const uploadRef = useRef(null)
    const inputRef = useRef(null)
    const inputWrapperRef = useRef(null)
    const [modalIsOpen, setModalIsOpen] = useState()
    const [iosHeight, setIosHeight] = useState(0)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const {clicked} = useOutsideClicker(inputWrapperRef)

    const formik = useFormik({
        initialValues: {
            text: '',
            caption: '',
            file: ''
        },
        onSubmit({text}, {resetForm}) {
            const formData = new FormData()
            formData.append('text', text)
            const date = moment().format('YYYY-MM-DD HH:mm')
            const temporaryId = uuidV4()
            if (!tmpMsg) {
                const payload = {
                    text,
                    date,
                    file: null,
                    sender: {username: currentProfile.slug_name}
                }
                userSentMessageMount({
                    partner: partner_slug,
                    data: formData,
                    uuid: temporaryId,
                    payload,
                    file: null,
                    onUploadProgress: (evt) => {
                        console.log(evt)
                    }
                })
            }

            if (tmpMsg) {
                if (tmpMsg.type === 'edit') {
                    const payload = {
                        ...tmpMsg,
                        updated: date,
                        text
                    }
                    userUpdateMessageMount({id: tmpMsg.id, data: {text}, partner: partner_slug, payload})
                }

                if (tmpMsg.type === 'reply') {
                    const payload = {
                        text,
                        id: temporaryId,
                        date: moment().format('YYYY-MM-DD HH:mm'),
                        sender: tmpMsg.sender,
                        reply_to: {
                            sender: tmpMsg.sender,
                            text: tmpMsg.text
                        }
                    }
                    formData.append('reply_to_id', tmpMsg.id)
                    userSentMessageMount({partner: partner_slug, data: formData, uuid: temporaryId, payload})
                }
            }


            resetForm()
            inputRef.current.focus()
            temporaryMessageMount(null)
        }
    })


    const disableScroll = useCallback(() => {
        if (!modalIsOpen) {
            window.scroll(0, 0)
        }
    }, [modalIsOpen])

    useEffect(() => {
        window.addEventListener('scroll', disableScroll)

        return () => {
            window.removeEventListener('scroll', disableScroll)
        }
    }, [disableScroll])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])

    const handleFocus = () => {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent)) {
            setIosHeight(252)
        } else {
            setIosHeight(0)
        }
    }

    const handleCancelModal = () => {
        formik.resetForm()
        setModalIsOpen(false)
    }

    const getTitle = useCallback(() => {
        let title = ''
        const file = formik.values.file

        if (file) {
            if (file.type.indexOf('image') !== -1) {
                title = t('send_photo')
            }
        }

        return title
    }, [formik, t])

    const handleGetFile = (file) => {
        formik.setFieldValue('file', file)
        setModalIsOpen(true)
    }

    useEffect(() => {
        if (clicked) {
            inputRef.current.blur()
            setIosHeight(0)
        }
    }, [clicked])

    return {
        handleFocus,
        uploadRef,
        inputRef,
        formik,
        inputWrapperRef,
        iosHeight,
        setModalIsOpen,
        modalIsOpen,
        handleCancelModal,
        getTitle,
        handleGetFile
    }
}


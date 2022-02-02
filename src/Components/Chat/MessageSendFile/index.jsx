import React, {useCallback, useEffect, useState} from 'react'
import {MessageUploadedFileWrapper} from '../style'
import {Col, Row} from 'antd'
import {v4 as uuidV4} from 'uuid'
import moment from 'moment'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$accountModel} from '../../../Models/account-model'
import {fileToBase64, resizeFile} from '../../../utils/crop-utils'
import {userMessageUploadProgress, userSentMessageMount} from '../../../Models/chat-model'
import {Button} from '../../../UIComponents/Button'
import {InputUI} from '../../../UIComponents/mu-inputs'


export const MessageSendFile = ({formik, onClose, id}) => {
    const [base64Url, setBase64Url] = useState(null)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()

    const getBase64Url = useCallback(async () => {
        const stringUrl = await fileToBase64(formik.values.file)
        setBase64Url(stringUrl)
    }, [formik.values.file])
    const file = formik.values.file

    useEffect(() => {
        getBase64Url()
    }, [getBase64Url])

    const handleClick = async () => {
        if (formik.values.file) {
            const file = await resizeFile(formik.values.file, false, 'file', 640, 640)
            onClose()
            const formData = new FormData()
            if (formik.values.caption) {
                formData.append('text', formik.values.caption)
            }
            formData.append('file', file)
            const temporaryId = uuidV4()
            const date = moment().format('YYYY-MM-DD HH:mm')
            const payload = {
                text: formik.values.caption,
                id: temporaryId,
                date,
                sender: {username: currentProfile.slug_name},
                file: base64Url
            }
            userSentMessageMount({
                partner: id,
                data: formData,
                uuid: temporaryId,
                payload,
                onUploadProgress: (evt) => {
                    console.log(evt)
                    let percentCompleted = Math.round((evt.loaded * 100) / evt.total)
                    userMessageUploadProgress({partner: id, payload, status:percentCompleted})
                }
            })
        }
    }

    return (
        <>
            {
                file && (
                    <MessageUploadedFileWrapper>
                        <Row gutter={[0, 16]} style={{marginBottom: 0}}>
                            <Col span={24}>
                                {
                                    formik.values.file.type.indexOf('image') !== -1 && (
                                        <div style={{textAlign: 'center'}}>
                                            <img src={base64Url} alt={file.name}/>
                                        </div>
                                    )
                                }
                            </Col>
                            <Col span={24}>
                                <InputUI
                                    name='caption'
                                    rows={2}
                                    label={'caption'}
                                    inputType='textarea'
                                    value={formik.values.caption}
                                    onChange={formik.handleChange}
                                />
                            </Col>
                            <Col span={24} style={{display: 'flex', justifyContent: 'center', paddingBottom: 0}}>
                                <Button variant='primary' size='l' onClick={handleClick}>
                                    {t('send')}
                                </Button>
                            </Col>
                        </Row>
                    </MessageUploadedFileWrapper>
                )
            }
        </>
    )
}
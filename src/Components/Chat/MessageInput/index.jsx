import React, {useEffect, useState} from 'react'
import {ChatReplyWrapper, MessageInputContainer, MessageSendButton} from '../style'
import {Col, Row} from 'antd'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {AttachSvg} from '../../../Icons/Attach'
import {SmileSvg} from '../../../Icons/Smile'
import {ArrowUpSvg} from '../../../Icons/Arrow'
import {useTranslation} from 'react-i18next'
import {SearchMicSvg} from '../../../Icons/SearchMic'
import {useStore} from 'effector-react'
import {$chatModel} from '../../../Models/chat-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import {CloseSvg} from '../../../Icons/Close'
import {AudioMessage} from './AudioMessage'

export const MessageInput = (
    {
        inputRef,
        uploadRef,
        formik,
        inputWrapperRef,
        handleFocus,
        handleCancelEditAndReply,
        handleGetFile
    }
) => {
    const {t} = useTranslation()
    const {$temporaryMessage: tmpMsg} = useStore($chatModel)
    const msgTxt = formik.values.text
    const [showAudio, setShowAudio] = useState(false)

    const handleClick = () => {
        if(msgTxt.length === 0 && !showAudio) {
            setShowAudio(true)
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
        }
    }, [inputRef])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {
                    tmpMsg &&
                    <ChatReplyWrapper>
                        {
                            tmpMsg.type === 'reply' && (
                                <Title level={5} weight={500} color='var(--primary-dwed)'>
                                    {tmpMsg.sender.full_name}
                                </Title>
                            )
                        }
                        {
                            tmpMsg.type === 'edit' && (
                                <Text level={5} color='var(--primary-dwed)'>
                                    {t('editing')}
                                </Text>
                            )
                        }
                        <Title weight={400} level={5}>
                            <span>{tmpMsg.text}</span>
                        </Title>
                        <IconBox onClick={handleCancelEditAndReply}>
                            <CloseSvg/>
                        </IconBox>
                    </ChatReplyWrapper>
                }
                <MessageInputContainer ref={inputWrapperRef}>
                    <Row gutter={8} wrap={false} align='bottom'>
                        <Col className='file-input' span='auto'>
                            <IconBox onClick={() => uploadRef.current.click()}>
                                <AttachSvg/>
                            </IconBox>
                            <input
                                type='file'
                                ref={uploadRef}
                                onChange={(e) => handleGetFile(e.target.files[0])}
                                style={{display: 'none'}}
                            />
                        </Col>
                        <Col span='auto' flex={1}>
                            <div className='text-input'>
                        <textarea
                            name='text'
                            ref={inputRef}
                            onFocus={handleFocus}
                            placeholder={t('message')}
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            style={{height: inputRef.current ? `${(inputRef.current.scrollHeight)}px` : '25px'}}
                        />
                                <IconBox>
                                    <SmileSvg/>
                                </IconBox>
                            </div>
                        </Col>
                        <Col span='auto'>
                            <MessageSendButton
                                type={msgTxt.length === 0 && !showAudio ? 'button' : 'submit'}
                                isVoice={msgTxt.length === 0 && !showAudio}
                                onClick={handleClick}
                            >
                                {
                                    msgTxt.length === 0 && !showAudio
                                        ? <SearchMicSvg/>
                                        : <ArrowUpSvg/>
                                }
                            </MessageSendButton>
                            {
                                showAudio && (
                                    <AudioMessage />
                                )
                            }
                        </Col>
                    </Row>
                </MessageInputContainer>
            </form>
        </>
    )
}
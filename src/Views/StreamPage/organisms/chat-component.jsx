import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {ChatCard} from './chat-card'
import {useStore} from 'effector-react'
import {SendSvg} from '../../../Icons/Send'
import stream from '../../../Service/stream'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {$streamModel} from '../../../Models/stream-model'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {$accountModel} from '../../../Models/account-model'
import InfiniteScroll from 'react-infinite-scroll-component'
import {StreamChatComponent, StreamChatForm} from '../atoms'


export const ChatComponent = ({setOpenChat, setModalIsOpen, owner, loadMore}) => {
    const {t} = useTranslation()
    const {slug_name} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [message, setMessage] = useState('')
    const {$streamChannelChat: {data, loading, result}} = useStore($streamModel)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentProfile) {
            if (message.length > 1) {
                const params = {
                    slug_name: slug_name,
                    data: {
                        text: message
                    }
                }
                stream.postStreamChannelChat(params)
                    .then(res => {
                        if (res) {
                            setMessage('')
                        }
                    })
            }
        }
    }
    
    const handleClickInput = () => {
        if (!currentProfile) {
            setModalIsOpen(true)
        }
    }
    
    return (
        <StreamChatComponent>
            <Row gutter={[0, 12]}>
                <Col span={24} className='chat-header padding'>
                    <Row justify='space-between' align='middle'>
                        <Col>
                            <Text level={4}>
                                {t('live_chat')}
                            </Text>
                        </Col>
                        <Col>
                            <IconBox onClick={() => setOpenChat(false)}>
                                <ArrowIosBottomSvg/>
                            </IconBox>
                        </Col>
                    </Row>
                </Col>
                {
                    data && (
                        <Col span={24}>
                            <InfiniteScroll
                                next={loadMore}
                                dataLength={result?.nextOffset || 10}
                                hasMore={!loading && !!result?.next}
                                loader={<>...loading</>}
                            >
                                <Row gutter={[0, 12]}>
                                    {
                                        data.map((item, idx) => (
                                            <Col
                                                span={24}
                                                key={`${idx + 1}`}
                                                className='padding'
                                                style={{display: 'flex', flexDirection: 'column-reverse'}}
                                            >
                                                <ChatCard item={item} owner={owner}/>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </InfiniteScroll>
                        </Col>
                    )
                }
            </Row>
            <StreamChatForm onSubmit={handleSubmit}>
                <input
                    onClick={handleClickInput}
                    placeholder={t('message')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconBox onClick={handleSubmit}>
                    <SendSvg/>
                </IconBox>
            </StreamChatForm>
        </StreamChatComponent>
    )
}
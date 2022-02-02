import React from 'react'
import {
    ChatIsOnline,
    ChatItemFile,
    ChatItemTime,
    ChatItemUnreadCount,
    StyledChatItem,
    StyledChatItemAvatar,
    StyledChatItemContent
} from '../style'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import img from '../../../Assets/Images/DefaultVideoScreen.png'
import {AttachSvg} from '../../../Icons/Attach'
import {truncateString} from '../../../utils/stringUtils'
import {VolumeOffFillSvg} from '../../../Icons/Volume'
import {useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {ShortCard} from '../../../Components/Cards'
import {useUserOnline} from '../../../Hooks/user/use-user-online'
import {getDWEDCHatListTime} from '../../../utils/time-utils'

export const ChatItem = ({receiver, last_message, isMuted, unread_count, path, typing}) => {
    const {t} = useTranslation()
    const {isOnline} = useUserOnline({username: receiver.username})

    const getFile = (fileUrl) => {
        let ext = fileUrl && fileUrl.match(/\.[^.\\/:*?"<>|\r\n]+$/)
        ext = ext && ext[0].substring(1)

        switch (ext) {
            case 'png':
                return <img src={img} alt='filename'/>
            default:
                return <AttachSvg/>
        }
    }

    return (
        <StyledChatItem to={path}>
            <StyledChatItemAvatar>
                <ShortCard
                    imgUrl={receiver.avatar}
                    imgSize={40}
                    isOfficial={receiver.is_official}
                />
                {
                    isOnline && <ChatIsOnline/>
                }
            </StyledChatItemAvatar>

            <StyledChatItemContent>
                <Row gutter={12} justify='space-between' align='middle'>
                    <Col span='auto' flex={1}>
                        <Title level={4}>
                            {truncateString(receiver.full_name, 24)}
                        </Title>
                    </Col>
                    {
                        last_message.date && (
                            <Col span='auto'>
                                <ChatItemTime>{getDWEDCHatListTime(last_message.date)}</ChatItemTime>
                            </Col>
                        )
                    }
                </Row>
                <Row gutter={12} align='middle'>
                    <Col span='auto' flex={1}>
                        <Text>
                            {
                                typing
                                    ? <span className='typing-text'>{t('typing')}</span>
                                    : (
                                        <>
                                            {
                                                last_message.file && (
                                                    <ChatItemFile>{getFile(last_message.file)}</ChatItemFile>
                                                )
                                            }
                                            {
                                                last_message && (
                                                    <span style={{fontWeight: !!unread_count && 500}}>
                                                        {
                                                            truncateString(
                                                                last_message.text,
                                                                last_message.file ? 20 : 24
                                                            )
                                                        }
                                                    </span>
                                                )
                                            }
                                        </>
                                    )
                            }
                        </Text>
                    </Col>
                    {isMuted && <Col span='auto'><VolumeOffFillSvg style={{marginLeft: 6}}/></Col>}
                    {
                        !!unread_count && (
                            <Col span='auto'>
                                <ChatItemUnreadCount isMuted={isMuted}>
                                    {unread_count}
                                </ChatItemUnreadCount>
                            </Col>
                        )
                    }
                </Row>
            </StyledChatItemContent>
        </StyledChatItem>
    )
}
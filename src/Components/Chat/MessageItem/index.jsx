import React from 'react'
import {Avatar, Col, Row} from 'antd'
import {
    MessageContent,
    MessageFileContent,
    MessageItemRow,
    MessageReplyContent,
    MessageStatusRow,
    MessageText,
    MessageTextContent
} from '../style'
import {Text} from '../../../UIComponents/Typography/Text'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {ClockSvg} from '../../../Icons/Clock'
import {AllDoneCheckSvg, CheckLineSvg} from '../../../Icons/CheckMark'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'
import {Title} from '../../../UIComponents/Typography/Title'
import {useChatIsRead} from '../../../Hooks/chat'

export const MessageItem = ({me, item, avatar, showAvatar, handleMsgClick, popupShowed}) => {
    const {ref} = useChatIsRead({item})
    const {t} = useTranslation()
    const isCurMsgPopup = popupShowed && popupShowed.id === item.id
    const getMsgDate = () => {
        return (
            <Text level={6}>
                {
                    item.updated
                        ? `${t('edited')} ${moment(item.updated).format('HH:mm')}`
                        : moment(item.date).format('HH:mm')
                }
            </Text>
        )
    }

    return (
        <Row justify={me ? 'end' : 'start'}>
            <Col span='auto' onClick={(e) => handleMsgClick(e, item, me)}>
                <MessageItemRow me={me} avatarShowed={showAvatar}>
                    {avatar && showAvatar && <Avatar className='message-item-avatar' src={avatar}/>}
                    <MessageContent
                        me={me}
                        style={{zIndex: isCurMsgPopup && 10}}
                        data-id={item.id} ref={ref}
                    >
                        {
                            (item.file) && (
                                <MessageFileContent>
                                    <ImageLazyLoad
                                        uploadProgress={item.uploadStatus}
                                        hideEffect={item.dataSrc}
                                        showProgress dataSrc={item.dataSrc}
                                        src={item.file} alt='file'/>
                                    {
                                        !item.text && (
                                            <div className='file-message-date'>
                                                <MessageStatusRow wrap={false}>
                                                    <Col span='auto'>
                                                        {moment(item.date).format('HH:mm')}
                                                    </Col>
                                                    {
                                                        me && <Col span='auto'>
                                                            <IconBox>
                                                                {
                                                                    item.sent
                                                                        ? <ClockSvg/>
                                                                        : item.is_read ? <AllDoneCheckSvg/> :
                                                                        <CheckLineSvg/>
                                                                }
                                                            </IconBox>
                                                        </Col>
                                                    }
                                                </MessageStatusRow>
                                            </div>
                                        )
                                    }
                                </MessageFileContent>
                            )
                        }
                        {
                            item.text && item.text.length > 0 && (
                                <>
                                    {
                                        item.reply_to && (
                                            <MessageReplyContent me={me}>
                                                <Title>
                                                    {item.reply_to.sender.full_name}
                                                </Title>
                                                <Text>
                                                    {item.reply_to.text}
                                                </Text>
                                            </MessageReplyContent>
                                        )
                                    }
                                    <MessageTextContent>
                                        <MessageText>
                                            {item.text}
                                        </MessageText>
                                        <MessageStatusRow wrap={false}>
                                            <Col span='auto'>
                                                {getMsgDate()}
                                            </Col>
                                            {
                                                me && (
                                                    <Col span='auto'>
                                                        <IconBox>
                                                            {
                                                                item.sent
                                                                    ? <ClockSvg/>
                                                                    : item.is_read ? <AllDoneCheckSvg/> :
                                                                    <CheckLineSvg/>
                                                            }
                                                        </IconBox>
                                                    </Col>
                                                )
                                            }
                                        </MessageStatusRow>
                                    </MessageTextContent>
                                </>
                            )
                        }
                    </MessageContent>
                </MessageItemRow>
            </Col>
        </Row>
    )
}
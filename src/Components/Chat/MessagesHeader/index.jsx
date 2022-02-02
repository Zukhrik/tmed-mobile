import React, {useCallback} from 'react'
import {MessagesHeaderContainer, MessagesHeaderRow} from '../style'
import {Col} from 'antd'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {ArrowIosLeftSvg} from '../../../Icons/Arrow'
import {ShortCard} from '../../Cards'
import {$chatModel, allChatsMount, chatForceLoading} from '../../../Models/chat-model'
import {URL_VALUES} from '../../../Constants'
import {useStore} from 'effector-react'
import {useHistory} from 'react-router-dom'

export const MessagesHeader = ({avatar, name, text}) => {
    const {push} = useHistory()
    const {$allChatList: {userChatForceLoading}} = useStore($chatModel)
    const onBack = useCallback(() => {
        if (!userChatForceLoading) {
            chatForceLoading(URL_VALUES.ALL_CHATS)
            const data = {
                clear: true,
                params: {
                    limit: 10,
                    offset: 0,
                    rtype: 'user'
                }
            }
            allChatsMount(data)
        }

        push('/chat')
    }, [push, userChatForceLoading])

    return (
        <MessagesHeaderContainer>
            <MessagesHeaderRow gutter={6} wrap={false}>
                <Col span='auto'>
                    <IconBox onClick={onBack} color='var(--dark-dwed)'>
                        <ArrowIosLeftSvg/>
                    </IconBox>
                </Col>
                <Col span='auto'>
                    <ShortCard
                        name={name}
                        imgUrl={avatar}
                        text={text}
                        truncateLength={24}
                    />
                </Col>
            </MessagesHeaderRow>
        </MessagesHeaderContainer>
    )
}
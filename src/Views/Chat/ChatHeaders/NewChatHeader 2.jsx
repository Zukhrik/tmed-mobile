import React from 'react'
import {ChatHeaderWrapper} from '../style'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {useChatCommon} from '../../../Hooks/chat'

export const NewChatHeader = () => {
    const {t} = useTranslation()
    const {getChatList} = useChatCommon()
    return (
        <ChatHeaderWrapper style={{textAlign: 'center'}}>
            <Title level={3}>
                {t('new_chat')}
            </Title>
            <Text level={5} onClick={() => getChatList('/chat')} className="new-chat-cancel">
                {t('cancel')}
            </Text>
        </ChatHeaderWrapper>
    )
}
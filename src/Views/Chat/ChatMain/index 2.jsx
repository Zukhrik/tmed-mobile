import React from 'react'
import {ChatActionWrapper, ChatLisWrapper, ChatTabItem, ChatTabs} from '../style'
import {useTranslation} from 'react-i18next'
import {Container, IconBox, RootContent} from '../../../UIComponents/GlobalStyles'
import {useChatList} from '../../../Hooks/chat'
import {SearchSvg} from '../../../Icons/Search'
import {URL_KEYS, URL_VALUES} from '../../../Constants'
import {useUrlParams} from '../../../Hooks/app'
import {AllChatList} from '../AllChatList'
import {Link} from 'react-router-dom'
import {EditPenUnderlineSvg} from '../../../Icons/Edit'

export const ChatMain = () => {
    const {t} = useTranslation()
    useChatList()
    const {urlData} = useUrlParams()
    const chatTab = urlData[URL_KEYS.CHAT_TAB]

    return (
        <RootContent>
            <Container>
                <ChatLisWrapper>
                    <ChatActionWrapper>
                        <Link to='/chat/new'>
                            <IconBox color="var(--primary-dwed)">
                                <EditPenUnderlineSvg/>
                            </IconBox>
                        </Link>
                        <ChatTabs>
                            <ChatTabItem
                                to={{pathname: '/chat', search: `${URL_KEYS.CHAT_TAB}=${URL_VALUES.ALL_CHATS}`}}
                                isActive={() => chatTab && chatTab === URL_VALUES.ALL_CHATS}
                            >
                                {t('chats')}
                            </ChatTabItem>
                            <ChatTabItem
                                to={{pathname: '/chat', search: `${URL_KEYS.CHAT_TAB}=${URL_VALUES.GROUP_CHATS}`}}
                                isActive={() => chatTab && chatTab === URL_VALUES.GROUP_CHATS}
                            >
                                {t('chat_group')}
                            </ChatTabItem>
                        </ChatTabs>
                        <IconBox>
                            <SearchSvg/>
                        </IconBox>
                    </ChatActionWrapper>
                    {
                        chatTab && chatTab === URL_VALUES.ALL_CHATS && <AllChatList/>
                    }
                </ChatLisWrapper>
            </Container>
        </RootContent>
    )
}
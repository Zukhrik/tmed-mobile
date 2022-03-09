import React from 'react'
import {FixedHeader} from '../../../Components/FixedHeader'
import {NewChatHeader} from '../ChatHeaders/NewChatHeader'
import {ChatNewItem, NewChatWrapper} from '../style'
import {Input} from '../../../UIComponents/Inputs'
import {useTranslation} from 'react-i18next'
import {SearchSvg} from '../../../Icons/Search'
import {Container} from '../../../UIComponents/GlobalStyles'
import {Col, Row} from 'antd'
import {PeopleFillSvg} from '../../../Icons/People'
import {useUserSubs} from '../../../Hooks/user'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {useUrlParams} from '../../../Hooks/app'
import {URL_KEYS} from '../../../Constants'
import {useChatContactSearch} from '../../../Hooks/chat'
import {ChatNewTab} from './ChatTab'
import {ChatSearchContact} from './SearchContact'
import {ChatContacts} from './ChatContacts'

export const NewChat = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const search = urlData[URL_KEYS.SEARCH]
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {loadMore: userSubsLoadMore} = useUserSubs({slug_name: currentProfile && currentProfile.slug_name})
    const {searchText, onChange, loadMore: searchLoadMore} = useChatContactSearch()

    return (
        <>
            <FixedHeader hideBorder component={<NewChatHeader/>}/>
            <NewChatWrapper>
                <Container className='chat-search-container'>
                    <Input
                        value={searchText || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={t('search')}
                        icon={<SearchSvg/>}
                    />
                </Container>
                {
                    !search && (
                        <Container>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <ChatNewItem>
                                        <PeopleFillSvg/>
                                        {t('new_group')}
                                    </ChatNewItem>
                                </Col>
                            </Row>
                        </Container>
                    )
                }

                <ChatNewTab/>
                {
                    !search && <ChatContacts loadMore={() => userSubsLoadMore('my')}/>
                }
                {
                    search && <ChatSearchContact loadMore={searchLoadMore}/>
                }
            </NewChatWrapper>
        </>
    )
}
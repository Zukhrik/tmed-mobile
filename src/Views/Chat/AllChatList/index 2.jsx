import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {Row} from 'antd'
import {useStore} from 'effector-react'
import {$chatModel} from '../../../Models/chat-model'
import {ChatItem} from '../ChatItem'
import {StyledChatCol} from '../style'

export const AllChatList = () => {
    const {$allChatList: {userChats, loading, userChatResult}, $userMessages: {typing}} = useStore($chatModel)
    const getSortedData = (data) => {
        return Object.values(data).sort((a, b) => new Date(b.last_message.date).getTime() - new Date(a.last_message.date).getTime())
    }

    return (
        <>
            {
                Object.values(userChats).length > 0 && (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => false}
                        hasMore={!!userChatResult.next && !loading}
                        initialLoad={false}
                    >
                        <Row gutter={24}>
                            {
                                getSortedData(userChats).map((item, idx) => {
                                    return (
                                        <StyledChatCol span={24} key={`${idx + 1}`}>
                                            <ChatItem
                                                path={`/chat/@${item.receiver.username}`}
                                                {...item}
                                                typing={typing && typing[item.receiver.username]}
                                            />
                                        </StyledChatCol>
                                    )
                                })
                            }
                        </Row>
                    </InfiniteScroll>
                )
            }
        </>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import {Container} from '../../../../UIComponents/GlobalStyles'
import {useUrlParams} from '../../../../Hooks/app'
import {URL_KEYS, URL_VALUES} from '../../../../Constants'
import {useStore} from 'effector-react'
import {$chatModel} from '../../../../Models/chat-model'
import {ChatContactItem} from '../../style'
import {ShortCard} from '../../../../Components/Cards'

export const ChatSearchContact = ({loadMore}) => {
    const {urlData} = useUrlParams()
    const tab = urlData[URL_KEYS.TAB]
    const {$searchContact: {data, result, loading, forceLoading}} = useStore($chatModel)

    return (
        <>
            <Container>
                {
                    tab && forceLoading[tab] === 2 && (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={tab && result[tab] && !!result[tab].next && !loading}
                            initialLoad={false}
                        >
                            <Row gutter={[24, 5]}>
                                {
                                    data[tab] && data[tab].length > 0 && (
                                        <>
                                            {
                                                tab === URL_VALUES.GROUP && data[tab].map((item, idx, arr) => (
                                                    <Col span={24} key={`${idx + 1}`}>
                                                        <ChatContactItem
                                                            to={`/chat/${item.slug_name}`}
                                                            style={{
                                                                padding: 10,
                                                                backgroundColor: '#F2F2F2',
                                                                borderRadius: '4px'
                                                            }}
                                                        >
                                                            <ShortCard
                                                                imgSize={40}
                                                                name={item.name}
                                                                imgUrl={item.avatar}
                                                                truncateLength={24}
                                                            />
                                                        </ChatContactItem>
                                                    </Col>
                                                ))
                                            }
                                            {/*{*/}
                                            {/*    tab === URL_VALUES.ORGANIZATION && data[tab].map((item, idx, arr) => (*/}
                                            {/*        <Col span={24} key={`${idx + 1}`}>*/}
                                            {/*            <ChatContactItem*/}
                                            {/*                to={`/chat/${item.slug_name}`}*/}
                                            {/*                style={{*/}
                                            {/*                    borderBottom: (arr.length !== (idx + 1)) &&*/}
                                            {/*                        '1px solid #BFBFBF'*/}
                                            {/*                }}*/}
                                            {/*            >*/}
                                            {/*                <ShortCard*/}
                                            {/*                    imgSize={40}*/}
                                            {/*                    name={item.name}*/}
                                            {/*                    text={item.category && item.category.name}*/}
                                            {/*                    imgUrl={item.logo}*/}
                                            {/*                    truncateLength={24}*/}
                                            {/*                    isOfficial={item.is_official}*/}
                                            {/*                />*/}
                                            {/*            </ChatContactItem>*/}
                                            {/*        </Col>*/}
                                            {/*    ))*/}
                                            {/*}*/}
                                            {
                                                tab === URL_VALUES.PEOPLE && data[tab].map((item, idx, arr) => (
                                                    <Col span={24} key={`${idx + 1}`}>
                                                        <ChatContactItem
                                                            to={`/chat/@${item.username}`}
                                                            style={{
                                                                padding: 10,
                                                                backgroundColor: '#F2F2F2',
                                                                borderRadius: '4px'
                                                            }}
                                                        >
                                                            <ShortCard
                                                                imgSize={40}
                                                                name={item.full_name}
                                                                text={item.main_cat && item.main_cat.name}
                                                                imgUrl={item.avatar}
                                                                truncateLength={24}
                                                                isOfficial={item.is_official}
                                                            />
                                                        </ChatContactItem>
                                                    </Col>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </Row>
                        </InfiniteScroll>
                    )
                }
            </Container>
        </>
    )
}
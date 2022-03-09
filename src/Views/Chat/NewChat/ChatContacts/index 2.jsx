import React from 'react'
import {Container} from '../../../../UIComponents/GlobalStyles'
import InfiniteScroll from 'react-infinite-scroller'
import {Col, Row} from 'antd'
import {ChatContactItem} from '../../style'
import {ShortCard} from '../../../../Components/Cards'
import {useStore} from 'effector-react'
import {$userModel} from '../../../../Models/user-model'
import {$accountModel} from '../../../../Models/account-model'

export const ChatContacts = ({loadMore}) => {
    const {$userSubsMy: {data, forceLoading, result, loading}} = useStore($userModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const slug_name = currentProfile && currentProfile.slug_name

    return (
        <Container>
            {
                !forceLoading && (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={slug_name && result[slug_name] && !!result[slug_name].next && !loading}
                        initialLoad={false}
                    >
                        <Row gutter={24}>
                            {
                                slug_name && data[slug_name] && data[slug_name].length > 0 &&
                                data[slug_name].filter(item => item.to_user).map((item, idx, arr) => (
                                    <Col span={24} key={`${idx + 1}`}>
                                        {
                                            item.to_user && (
                                                <ChatContactItem
                                                    to={`/chat/@${item.to_user.username}`}
                                                    style={{
                                                        borderBottom: (arr.length !== (idx + 1)) &&
                                                            '1px solid #BFBFBF'
                                                    }}
                                                >
                                                    <ShortCard
                                                        imgSize={40}
                                                        name={item.to_user.full_name || ''}
                                                        text={
                                                            item.to_user.main_cat &&
                                                            item.to_user.main_cat.name
                                                        }
                                                        imgUrl={item.to_user.avatar}
                                                        truncateLength={24}
                                                        isOfficial={item.to_user.is_official}
                                                    />
                                                </ChatContactItem>
                                            )
                                        }
                                        {/*{*/}
                                        {/*    item.to_org && (*/}
                                        {/*        <ChatContactItem*/}
                                        {/*            to='/chat'*/}
                                        {/*            style={{*/}
                                        {/*                borderBottom: (arr.length !== (idx + 1)) &&*/}
                                        {/*                    '1px solid #BFBFBF'*/}
                                        {/*            }}*/}
                                        {/*        >*/}
                                        {/*            <ShortCard*/}
                                        {/*                imgSize={40}*/}
                                        {/*                name={item.to_org.name || ''}*/}
                                        {/*                text={*/}
                                        {/*                    item.to_org.category &&*/}
                                        {/*                    item.to_org.category.name*/}
                                        {/*                }*/}
                                        {/*                imgUrl={item.to_org.logo}*/}
                                        {/*                truncateLength={24}*/}
                                        {/*                isOfficial={item.to_org.is_official}*/}
                                        {/*            />*/}
                                        {/*        </ChatContactItem>*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </Col>
                                ))
                            }
                        </Row>
                    </InfiniteScroll>
                )
            }
        </Container>
    )
}
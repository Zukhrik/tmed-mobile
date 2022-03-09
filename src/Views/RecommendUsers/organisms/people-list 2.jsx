import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {RecommendUserCard} from './reccomend-users-card'
import {$userModel, subscribeToRecommendUserMount} from '../../../Models/user-model'
import InfiniteScroll from 'react-infinite-scroll-component'

export const PeopleList = ({loadMore}) => {
    const {$recommendUsers: {data, loading, result}} = useStore($userModel)
    
    const handleSubscribe = (event) => {
        if (!event.subs.subscribed) {
            const params = {
                username: event.username
            }
            subscribeToRecommendUserMount(params)
        }
    }
    
    return (
        <InfiniteScroll
            style={{overflow: 'visible', paddingBottom: '60px'}}
            next={loadMore}
            dataLength={result.nextOffset || 10}
            hasMore={!loading && !!result.next}
            loader={<>...loading</>}
        >
            <Row gutter={[0, 12]}>
                {
                    data && data.length > 0 && data.map((item, idx) => (
                        <Col
                            span={24}
                            key={`${idx + 1}`}
                        >
                            <RecommendUserCard
                                item={item}
                                imgUrl={item.avatar}
                                name={item.full_name}
                                username={item.username}
                                text={item.main_cat.name}
                                handleSubscribe={handleSubscribe}
                                path={`@${item.username}/tape`}
                                subscribed={item.subs.subscribed}
                            />
                        </Col>
                    ))
                }
            </Row>
        </InfiniteScroll>
    )
}
import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {FollsListWrapper} from '../atoms'
import {useStore} from 'effector-react'
import {$userModel, userSubsMeMount} from '../../../Models/user-model'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import {AccountSearchInput} from '../molecules'
import {useParams} from 'react-router-dom'
import {generateSkeleton} from '../../../utils/skeleton-utils'

const initialParams = {
    limit: 2,
    offset: 0
}
const skeleton = generateSkeleton(5)
export const FollowersList = ({loadMore}) => {
    const {username} = useParams()
    const {$userSubsMe: {data, result, loading, forceLoading}} = useStore($userModel)
    const [search, setSearch] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim().length > 2) {
            const data = {
                clear: true,
                username: username,
                params: {
                    ...initialParams,
                    search: search
                }
            }
            userSubsMeMount(data)
        }
    }
    
    
    return (
        <FollsListWrapper>
            <InfiniteScroll
                next={loadMore}
                dataLength={result?.nextOffset || 10}
                hasMore={!loading && !!result?.next}
                style={{overflow: 'hidden'}}
                loader={<>...loading</>}
            >
                <Row gutter={[0, 12]}>
                    <Col span={24}>
                        <AccountSearchInput search={search} setSearch={setSearch} handleSubmit={handleSubmit}/>
                    </Col>
                    {
                        forceLoading === 2
                            ? <>
                                {
                                    data && data.map((item, idx) => (
                                        <Col
                                            span={24}
                                            key={`${idx + 1}`}
                                        >
                                            <Row justify='space-between' align='middle' wrap={false}>
                                                <Col>
                                                    <ShortCard
                                                        imgSize={48}
                                                        imgUrl={item.follower_user.avatar}
                                                        name={item.follower_user.full_name}
                                                        text={item.follower_user.main_cat.name}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </>
                            : <>
                                {
                                    skeleton.map((item, idx) => (
                                        <Col
                                            span={24}
                                            key={`${idx + 1}`}
                                        >
                                            <ShortCardSkeleton
                                                size={48}
                                            />
                                        </Col>
                                    ))
                                }
                            </>
                    }
                </Row>
            </InfiniteScroll>
        </FollsListWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../Models/order-model'
import {RecordCard, RecordCardSkeleton} from '../molecules'
import moment from 'moment'
import {useOrderList} from '../../../Hooks/order'
import {useHistory} from 'react-router-dom'
import {saveURLMount} from '../../../Models/app'
import InfiniteScroll from 'react-infinite-scroll-component'
import {generateSkeleton} from '../../../utils/skeleton-utils'


const skeleton = generateSkeleton(5)
export const MyOrders = () => {
    const {loadMore} = useOrderList()
    const {push, location: {pathname}} = useHistory()
    const {$orderList: {data, loading, result, forceLoading}} = useStore($orderModel)
    
    const handlePush = (item) => {
        push(`/records/detail/${item.id}`)
        saveURLMount(pathname)
    }
    
    return (
        <>
            {
                forceLoading === 2
                    ? (
                        <InfiniteScroll
                            next={loadMore}
                            hasMore={!loading && !!result.next}
                            style={{overflow: 'hidden'}}
                            dataLength={result.nextOffset || 10}
                            loader={<>...loading</>}
                        >
                            <Row gutter={[0, 12]} style={{paddingBottom: 65}} className='container'>
                                {
                                    data.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <RecordCard
                                                meet={moment(item.meet_date).format('LT')}
                                                status={item.status}
                                                date={moment(item.meet_date).format('DD/MM/YY')}
                                                name={item.responsible.user.full_name}
                                                category={item.responsible.user.main_cat.name}
                                                src={item.responsible.org.logo}
                                                link={() => handlePush(item)}
                                            />
                                        </Col>
                                    ))
                                }
                            
                            </Row>
                        </InfiniteScroll>
                    ) : (
                        <Row gutter={[0, 12]} className='container'>
                            {
                                skeleton.map((item, idx) => (
                                    <Col span={24} key={`${idx + 1}`}>
                                        <RecordCardSkeleton/>
                                    </Col>
                                ))
                            }
                        </Row>
                    )
            }
        </>
    )
}

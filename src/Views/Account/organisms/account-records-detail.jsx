import React from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {RecordsCard} from '../molecules'
import {useOrder} from '../../../Hooks/org'
import {useGoBack} from '../../../Hooks/app'
import {useOrderIdOffers} from '../../../Hooks/order'
import {useHistory, useParams} from 'react-router-dom'
import {$orderModel} from '../../../Models/order-model'
import {FixedHeader} from '../../../Components/FixedHeader'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {RecordsCardSkeleton} from '../molecules/records-card-skeleton'

const skeleton = generateSkeleton(3)
export const AccountRecordsDetail = () => {
    useOrder()
    useOrderIdOffers()
    const {push, location: {pathname}} = useHistory()
    const {order_id} = useParams()
    const {username} = useParams()
    const {$orderIdOffers: {data, forceLoading}, $orderDetail: {data: detail}} = useStore($orderModel)
    const {goBack} = useGoBack({pathname: `/@${username}/records`})
    const meetDate = detail && detail[order_id]?.meet_date
    
    const handleCardClick = (item) => {
        if (item.offering.id) {
            push(`${pathname}/${item.id}`)
        }
    }
    
    return (
        <RootContent
            paddingTop={62}
            height='100vh'
        >
            <FixedHeader
                title={detail[order_id]?.responsible?.org?.name}
                goBack={goBack}
            />
            <Row className='container' gutter={[0, 12]} style={{paddingBottom: 65}}>
                {
                    forceLoading === 2 && data
                        ? (
                            <>
                                {
                                    data.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <RecordsCard
                                                offeringName={item.offering.name}
                                                offeringUrl={item.offering.image}
                                                orgName={item.offering.org.name}
                                                meetTime={moment(meetDate).format('DD.MM.YYYY HH:mm')}
                                                containerPath={() => handleCardClick(item)}
                                            />
                                        </Col>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    skeleton.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <RecordsCardSkeleton/>
                                        </Col>
                                    ))
                                }
                            </>
                        )
                }
            </Row>
        </RootContent>
    )
}
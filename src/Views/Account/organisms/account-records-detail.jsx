import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useOrder} from '../../../Hooks/org'
import {useOrderIdOffers} from '../../../Hooks/order'
import {$orderModel} from '../../../Models/order-model'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {useHistory, useParams} from 'react-router-dom'
import {RecordsCard} from '../molecules'
import moment from 'moment'
import {FixedHeader} from '../../../Components/FixedHeader'
import {useGoBack} from '../../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {QRCodeCartCardSkeleton} from '../../../Components/Cards'
import {generateSkeleton} from '../../../utils/skeleton-utils'

const skeleton = generateSkeleton(3)
export const AccountRecordsDetail = () => {
    useOrder()
    useOrderIdOffers()
    const {push, location: {pathname}} = useHistory()
    const {t} = useTranslation()
    const {order_id} = useParams()
    const {username} = useParams()
    const {$orderIdOffers: {data, forceLoading}, $orderDetail: {data: detail}} = useStore($orderModel)
    const {goBack} = useGoBack({pathname: `/@${username}/records`})
    const meetDate = detail && detail[order_id]?.meet_date
    const responsible = detail && detail[order_id]?.responsible?.user
    
    const handleCardClick = (item) => {
        if (item.offering.id) {
            push(`${pathname}/${item.id}`)
        }
    }
    
    return (
        <RootContent
            paddingTop={62}
            paddingBottom={65}
            height='100vh'
        >
            <FixedHeader
                title={t('records')}
                goBack={goBack}
            />
            <Row className='container' gutter={[0, 12]}>
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
                                                specName={responsible?.full_name}
                                                specCat={responsible?.main_cat?.name}
                                                specSrc={responsible?.avatar}
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
                                            <QRCodeCartCardSkeleton/>
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
import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../Models/order-model'
import {useOrderIdOffers, useOrderOfferIdConclusions} from '../../../Hooks/order'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {useParams} from 'react-router-dom'
import {useOrder} from '../../../Hooks/org'
import {useGoBack} from '../../../Hooks/app'
import {Avatar} from '../../../UIComponents/Avatar'
import {Text} from '../../../UIComponents/Typography/Text'
import {useTranslation} from 'react-i18next'
import {$accountModel} from '../../../Models/account-model'
import moment from 'moment'
import {AccountRecordOfferIdSkeleton} from './account-record-offer-id-skeleton'

export const AccountRecordOfferId = () => {
    useOrder()
    useOrderIdOffers()
    useOrderOfferIdConclusions()
    const {t} = useTranslation()
    const {order_id, offer_id, username} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {
        $orderOffersConclusions: {data: conclusion, forceLoading: conclusionsForceLoading},
        $orderDetail: {data: detail, forceLoading: detailForceLoading},
        $orderIdOffers: {data: offerList, forceLoading: orderIdOffersForceLoading}
    } = useStore($orderModel)
    const meetDate = detail && detail[order_id]?.meet_date
    const responsible = detail && detail[order_id]?.responsible?.user
    const currentOffer = offerList && offerList.find(item => item.id === Number(offer_id))
    const {goBack} = useGoBack({pathname: `/@${username}/records/${order_id}`})
    
    return (
        <RootContent
            height='100vh'
            paddingTop={62}
        >
            <FixedHeader
                title={currentOffer?.offering?.name}
                goBack={goBack}
            />
            {
                orderIdOffersForceLoading && conclusionsForceLoading && detailForceLoading === 2
                    ? (
                        <Row gutter={[0, 12]} className='container' style={{paddingBottom: 65}}>
                            {
                                currentOffer && (
                                    <Col span={24}>
                                        <Row wrap={false} gutter={[8, 0]} align='middle'>
                                            <Col>
                                                <Avatar size={48} shape='square' imgUrl={currentOffer?.offering?.image}/>
                                            </Col>
                                            <Col flex={1}>
                                                <Text level={5}>{currentOffer?.offering?.name}</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            }
                            {
                                conclusion && (
                                    <Col
                                        span={24}
                                        style={{display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f2f2f2'}}
                                    >
                                        <Text color='var(--grey-dwed)' level={4}>{`${t('conclusion')}:`}</Text>
                                        {
                                            conclusion.map((item, idx) => (
                                                <Col
                                                    span={24}
                                                    key={`${idx + 1}`}
                                                    dangerouslySetInnerHTML={{__html: item.conclusion}}
                                                />
                                            ))
                                        }
                                    </Col>
                                )
                            }
                            <Col span={24}>
                                <Row wrap={false} justify='space-between'>
                                    <Col>
                                        <Text color='var(--grey-dwed)' level={4}>{`${t('specialist')}: `}</Text>
                                    </Col>
                                    <Col>
                                        <Text level={4}>{responsible?.full_name}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row wrap={false} justify='space-between'>
                                    <Col>
                                        <Text color='var(--grey-dwed)' level={4}>{`${t('cost')}: `}</Text>
                                    </Col>
                                    {
                                        currentOffer && currentProfile && (
                                            <Col>
                                                <Text
                                                    level={4}>{`${currentOffer?.cost} ${currentProfile?.currency?.code}`}</Text>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row wrap={false} justify='space-between'>
                                    <Col>
                                        <Text color='var(--grey-dwed)' level={4}>{`${t('date')}: `}</Text>
                                    </Col>
                                    <Col>
                                        <Text level={4}>{meetDate && moment(meetDate).format('HH:mm DD.MM.YYYY')}</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <AccountRecordOfferIdSkeleton/>
                    )
            }
        </RootContent>
    )
}
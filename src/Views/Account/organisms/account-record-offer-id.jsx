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
import {ShortCard} from '../../../Components/Cards'
import {$accountModel} from '../../../Models/account-model'
import moment from 'moment'

export const AccountRecordOfferId = () => {
    useOrder()
    useOrderIdOffers()
    useOrderOfferIdConclusions()
    const {t} = useTranslation()
    const {order_id, offer_id, username} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {
        $orderOffersConclusions: {data: conclusion},
        $orderDetail: {data: detail},
        $orderIdOffers: {data: offerList}
    } = useStore($orderModel)
    const orgName = detail && detail[order_id]?.responsible?.org?.name
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
                title={orgName}
                goBack={goBack}
            />
            <Row gutter={[0, 12]} className='container'>
                {
                    currentOffer && (
                        <Col span={24}>
                            <Row wrap={false} gutter={[8, 0]}>
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
                <Col span={24}>
                    <Text>{t('specialist')}</Text>
                </Col>
                {
                    responsible && (
                        <Col span={24}>
                            <ShortCard
                                imgSize={40}
                                imgUrl={responsible?.avatar}
                                name={responsible?.full_name}
                                text={responsible?.main_cat?.name}
                            />
                        </Col>
                    )
                }
                <Col span={24}>
                    <Row wrap={false} justify='space-between'>
                        <Col>
                            <Text>{t('quantity')}</Text>
                        </Col>
                        <Col>
                            {currentOffer?.qty}
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row wrap={false} justify='space-between'>
                        <Col>
                            <Text>{t('cost')}</Text>
                        </Col>
                        {
                            currentOffer && currentProfile && (
                                <Col>
                                    {`${currentOffer?.cost} ${currentProfile?.currency?.code}`}
                                </Col>
                            )
                        }
                    </Row>
                </Col>
                <Col span={24}>
                    <Row wrap={false} justify='space-between'>
                        <Col>
                            <Text>{t('date')}</Text>
                        </Col>
                        <Col>
                            {meetDate && moment(meetDate).format('DD.MM.YYYY HH:mm')}
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Text>{t('description')}</Text>
                </Col>
                {
                    conclusion && conclusion.length > 0
                        ? (
                            <>
                                {
                                    conclusion.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}
                                             dangerouslySetInnerHTML={{__html: item.conclusion}}/>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                            </>
                        )
                }
            </Row>
        </RootContent>
    )
}
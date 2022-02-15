import React from 'react'
import moment from 'moment'
import {Col, Image, Row} from 'antd'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {DetailImageWrapper} from '../atoms'
import {$appModel} from '../../../Models/app'
import {$accountModel} from '../../../Models/account-model'
import {$orderModel, resetOrderIdOffers} from '../../../Models/order-model'
import {RootContent, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {OrderIdOfferCard} from '../../../Components/Cards/OrderIdOfferCard'
import {useGoBack} from '../../../Hooks/app'
import {generateQrCodeBase64} from '../../../utils/qr_code'
import {getStatus} from '../../../utils/get-status'
import qrBlur from '../../../Assets/Images/qr-blur.png'

export const MobileView = () => {
    const {t} = useTranslation()
    const {order_id} = useParams()
    const {$app: {saveURL}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$orderDetail: {data, forceLoading}} = useStore($orderModel)
    const {$orderIdOffers: {data: orderIdOffersData}} = useStore($orderModel)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : '/records/unregistered'})
    
    const goBackAndReset = () => {
        resetOrderIdOffers()
        goBack()
    }
    
    console.log(orderIdOffersData)
    
    return (
        <RootContent paddingTop={70} paddingBottom={60}>
            <FixedHeader
                goBack={goBackAndReset}
                title={t('detailed_order_information')}
            />
            <DetailImageWrapper
                width='100%'
                padding='0 12px'
            >
                <Row
                    gutter={[0, 12]}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Col
                        span={24}
                        className='qr-code-wrapper'
                    >
                        {
                            forceLoading === 2 && data?.[order_id]
                                ? <>
                                    <Image
                                        width={150}
                                        height={150}
                                        preview={data?.[order_id]?.status !== 0 ? {mask: ''} : false}
                                        src={
                                            data?.[order_id]?.status !== 0 && data?.[order_id]?.qr_code
                                                ? generateQrCodeBase64(data?.[order_id]?.qr_code)
                                                : qrBlur
                                        }
                                    />
                                </>
                                : <SkeletonUI animation='wave' variant='rect' width={150} height={150}/>
                        }
                    </Col>
                    <Col span={24} className='meet-time-mobile'>
                        <Title alignType='center'>
                            {data?.[order_id] && moment(data?.[order_id]?.meet_date).format('HH:mm')}
                        </Title>
                        <Text level={4} alignType='center'>
                            {t('your_time')}
                        </Text>
                    </Col>
                    <Col className='display-style'>
                        <Text
                            className='static-width'
                            color='var(--grey-dwed)'
                        >
                            {`${t('order_status')}: `}
                        </Text>
                        {
                            data && data?.[order_id] && (
                                <Title color={getStatus(data?.[order_id]?.status)?.color}>
                                    {getStatus(data?.[order_id]?.status)?.text}
                                </Title>
                            )
                        }
                    </Col>
                    <Col className='display-style'>
                        <Text
                            color='var(--grey-dwed)'
                            className='static-width'
                        >
                            {`${t('organization')}: `}
                        </Text>
                        <Title alignType='right'>
                            {data && data?.[order_id]?.responsible?.org?.name}
                        </Title>
                    </Col>
                    <Col className='display-style'>
                        <Text className='static-width' color='var(--grey-dwed)'>{`${t('specialist_category')}: `}</Text>
                        <Title alignType='right'>
                            {data?.[order_id]?.responsible?.spec_cat?.name}
                        </Title>
                    </Col>
                    <Col className='display-style'>
                        <Text className='static-width' color='var(--grey-dwed)'>{`${t('specialist')}: `}</Text>
                        <Title>
                            {data && data?.[order_id]?.responsible?.user?.full_name}
                        </Title>
                    </Col>
                    <Col className='display-style'>
                        <Text className='static-width' color='var(--grey-dwed)'>{`${t('date')}: `}</Text>
                        <Title>
                            {data && moment(data?.[order_id]?.meet_date).format('YYYY-MM-DD')}
                        </Title>
                    </Col>
                    <Col className='display-style'>
                        <Text className='static-width' color='var(--grey-dwed)'>{`${t('total_cost')}: `}</Text>
                        <Title>{data && data[order_id] &&
                            `${data?.[order_id]?.total_cost?.toLocaleString('fi-Fi')}
                                                ${currentProfile?.currency?.code?.toUpperCase()}`
                        }</Title>
                    </Col>
                    <Col className='display-style'>
                        <Text className='static-width' color='var(--grey-dwed)'>{`${t('offerings')}: `}</Text>
                    </Col>
                    {
                        orderIdOffersData?.map((item, idx) => (
                            <Col key={`${idx + 1}`}>
                                <OrderIdOfferCard
                                    count={item.qty}
                                    cost={item.offering.cost}
                                    src={item.offering.image}
                                    title={item.offering.name}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </DetailImageWrapper>
        </RootContent>
    )
}
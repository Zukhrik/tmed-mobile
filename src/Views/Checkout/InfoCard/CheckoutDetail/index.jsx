import React, {useCallback, useMemo, useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {CheckoutDetailWrapper} from '../style'
import {CreditCardDetail} from './CreditCardDetail'
import {ArrowIosRightSvg} from '../../../../Icons/Arrow'
import {$orderModel} from '../../../../Models/order-model'
import {Text} from '../../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../../Models/account-model'
import {OverlaySettings} from '../../../../Components/Overlay'
import {Title} from '../../../../UIComponents/Typography/Title'
import {CouponCardItem} from '../../../../Components/Cards/Coupon/molecules'

export const CheckoutDetail = ({payment, setPayment, setCouponId}) => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const [discount, setDiscount] = useState(null)
    const [openCard, setOpenCard] = useState(false)
    const {$orgOrderCartList: {data, result}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [cardWrapper, setCardWrapper] = useState(false)
    
    const onClose = () => {
        setOpenCard(false)
        setCardWrapper(false)
    }
    
    const paymentInfo = useMemo(() => {
        return payment.id !== 3
            ? t(payment.title)
            : payment.title
    }, [payment.id, payment.title, t])
    
    const generateDiscountCost = useCallback(() => {
        let cost = data?.[organization]?.[0]?.total_cost
        if (discount && data) {
            return cost - cost * (discount / 100).toLocaleString('fi-Fi')
        } else {
            return cost.toLocaleString('fi-Fi')
        }
    }, [discount, data, organization])
    
    const handleClick = (item) => {
        setCouponId(item.id)
        setDiscount(item.offerings_discount)
    }
    
    return (
        <CheckoutDetailWrapper>
            <OverlaySettings
                openSettings={openCard}
                onClose={onClose}
                content={<CreditCardDetail
                    onClose={onClose}
                    cardWrapper={cardWrapper}
                    setCardWrapper={setCardWrapper}
                    payment={payment}
                    setPayment={setPayment}
                />}
            />
            <Row gutter={[0, 12]}>
                <Col span={24} onClick={() => setOpenCard(true)}>
                    <Row justify='space-between'>
                        <Col>
                            <Row>
                                <Col span={24}>
                                    <Text>{t('select_payment_methods')}</Text>
                                </Col>
                                <Col span={24}>
                                    <Text color='var(--grey-dwed)'>
                                        {paymentInfo}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='payment-icon-wrapper'>
                            <ArrowIosRightSvg/>
                        </Col>
                    </Row>
                </Col>
                {
                    result && organization && result?.[organization]?.coupons?.length > 0
                    && (
                        <Col span={24}>
                            <Row gutter={[0, 12]}>
                                <Col span={24}>
                                    <Text>{t('coupon_discount')}</Text>
                                </Col>
                                {
                                    result?.[organization]?.coupons?.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <CouponCardItem
                                                color={item.background_color}
                                                title={item.title}
                                                percent={item.offerings_discount}
                                                fromDate={item.from_date}
                                                toDate={item.to_date}
                                                handleClick={() => handleClick(item)}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    )
                }
                <Col span={24}>
                    <Row gutter={[12, 0]} align='middle' justify='space-between'>
                        <Col>
                            <Title color='var(--grey-dwed)'>{`${t('cost')}:`}</Title>
                        </Col>
                        <Col>
                            {
                                data?.[organization] && currentProfile &&
                                <Title>
                                    {`${data?.[organization]?.[0]?.total_cost?.toLocaleString('fi-Fi')}
                                                ${currentProfile?.currency?.code?.toUpperCase()}`}
                                </Title>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]} align='middle' justify='space-between'>
                        <Col>
                            <Title color='var(--grey-dwed)'>{`${t('discount')}:`}</Title>
                        </Col>
                        <Col>
                            <Title>
                                {
                                    !!discount
                                        ? `${discount}%`
                                        : '-'
                                }
                            </Title>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]} align='middle' justify='space-between'>
                        <Col>
                            <Title color='var(--grey-dwed)'>{`${t('total_cost')}:`}</Title>
                        </Col>
                        <Col>
                            {
                                data?.[organization] && currentProfile &&
                                <Title>
                                    {`${generateDiscountCost()}
                                                ${currentProfile?.currency?.code?.toUpperCase()}`}
                                </Title>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </CheckoutDetailWrapper>
    )
}
import React, {useCallback, useMemo, useState} from 'react'
import {Col, Radio, Row} from 'antd'
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
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {$orgModel} from '../../../../Models/org-model'
import {FormControl, FormControlLabel, FormLabel, RadioGroup} from '@material-ui/core'
import {PAYMENT_METHOD} from '../../../../Constants/payment'
import {AllScreenModal} from '../../../../Components/Modal'
import {CouponList} from './CouponList'

export const CheckoutDetail = ({payment, setPayment, setCouponId}) => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const [discount, setDiscount] = useState(null)
    const [openCard, setOpenCard] = useState(false)
    const {$orgOrderCartList: {data}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [cardWrapper, setCardWrapper] = useState(false)
    const [couponView, setCouponView] = useState(false)
    const [couponName, setCouponName] = useState(t('select_coupon'))
    const {$orgPaymentMethods: {data: orgPayments}} = useStore($orgModel)
    
    const onClose = () => {
        setOpenCard(false)
        setCardWrapper(false)
    }
    
    const paymentInfo = useMemo(() => {
        return payment.id !== 3
            ? t(payment.title)
            : payment.title
    }, [payment.id, payment.title, t])
    
    const cardStyle = useCallback((number) => {
        let tmp = ''
        for (let i = 0; i < number.length; i++) {
            if (i % 4 === 0) {
                tmp += ' ' + number[i]
            } else {
                tmp += number[i]
            }
        }
        return tmp
    }, [])
    
    const handleChange = (value, item = undefined) => {
        if (item) {
            setPayment({
                id: item.id,
                title: `${cardStyle(item.card_number)} ${item.name}`,
                extraId: value
            })
        } else {
            setPayment({
                id: PAYMENT_METHOD[value].title,
                title: PAYMENT_METHOD[value].title,
                extraId: value
            })
        }
    }
    
    const generateOrgPayments = useCallback((item) => {
        if (item.status && item.method !== 3) {
            if (item.method === 1) {
                return t('cash')
            } else if (item.method === 2) {
                return t('terminal')
            }
        }
    }, [t])
    
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
        setCouponView(false)
        setCouponName(item.title)
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
            <AllScreenModal
                visible={couponView}
                close={() => setCouponView(false)}
                body={<CouponList
                    goBack={() => setCouponView(false)}
                    handleClick={handleClick}
                />}
            />
            {
                $device && $device === INFO_MAT
                    ? (
                        <Row gutter={[0, 24]}>
                            <Col span={24}>
                                <FormControl>
                                    <FormLabel component='legend'>
                                        {t('select_payment_methods')}
                                    </FormLabel>
                                    <RadioGroup row className='radio-wrapper'>
                                        {
                                            orgPayments && orgPayments.map(item => (
                                                <FormControlLabel
                                                    className='radio'
                                                    key={item.id}
                                                    checked={payment.extraId === item.method}
                                                    value={item.status && item.method}
                                                    label={generateOrgPayments(item)}
                                                    control={item.method !== 3 ?
                                                        <Radio color='primary'/> : <span/>}
                                                    onChange={() => handleChange(item.method)}
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Col>
                            <Col span={24}>
                                <Row align='middle' justify='space-between'>
                                    <Col>
                                        <Title color='var(--grey-dwed)'>{`${t('total_cost')}:`}</Title>
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
                        </Row>
                    )
                    : (
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
                            <Col span={24} onClick={() => setCouponView(true)}>
                                <Row justify='space-between'>
                                    <Col>
                                        <Row>
                                            <Col span={24}>
                                                <Text>{t('coupon_discount')}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text color='var(--grey-dwed)'>
                                                    {couponName}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className='payment-icon-wrapper'>
                                        <ArrowIosRightSvg/>
                                    </Col>
                                </Row>
                            </Col>
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
                                        {
                                            !!discount &&
                                            <Title>{`${discount}%`}</Title>
                                        }
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
                    )
            }
        </CheckoutDetailWrapper>
    )
}
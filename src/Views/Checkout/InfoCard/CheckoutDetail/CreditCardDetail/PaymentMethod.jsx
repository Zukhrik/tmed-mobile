import React, {useCallback} from 'react'
import {useStore} from 'effector-react'
import {Col, Radio, Row, Space} from 'antd'
import {useTranslation} from 'react-i18next'
import payment from '../../../../../Service/payment'
import {PlusFillSvg} from '../../../../../Icons/Plus'
import {HUMOSvg, UZCARDSvg} from '../../../../../Icons/Cards'
import {$paymentModel} from '../../../../../Models/payment-model'
import {Title} from '../../../../../UIComponents/Typography/Title'
import {CardInfoWrapper, PaymentMethodsWrapper, VerifyCardLink} from '../../style'
import {PAYMENT_METHOD} from '../../../../../Constants/payment'
import {$orgModel} from '../../../../../Models/org-model'

export const PaymentMethod = (
    {
        onClose,
        setCardId,
        setPayment,
        handleAddCard,
        setCardWrapper,
        payment: paymentType
    }
) => {
    const {t} = useTranslation()
    const {$accountCard: {data}} = useStore($paymentModel)
    const {$orgPaymentMethods: {data: orgPayments}} = useStore($orgModel)
    
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
        
        onClose()
    }
    
    
    const handleActivateCard = (item) => {
        const params = {
            id: item.id
        }
        
        payment.resendPayMeCode(params)
            .then(res => {
                if (res) {
                    setCardWrapper(true)
                }
            })
            .finally(() => {
                setCardId(item.id)
            })
    }
    
    const generateCardType = (item) => {
        if (Number(item.card_number.substr(0, 4)) === 8600) {
            return <UZCARDSvg/>
        } else {
            return <HUMOSvg/>
        }
    }
    
    
    return (
        <Row gutter={[0, 12]} className='select-card-wrapper'>
            <Col span={24}>
                <Title>{t('payment_method')}</Title>
            </Col>
            {
                data && (
                    <Col span={24}>
                        <PaymentMethodsWrapper>
                            <Radio.Group
                                defaultValue='1'
                                value={paymentType.id}
                            >
                                <Space direction='vertical'>
                                    {
                                        orgPayments.find(item => item.method === 1 && item.status) && (
                                            <Radio
                                                value='cash'
                                                onClick={(e) => handleChange(1)}
                                            >
                                                {t('cash')}
                                            </Radio>
                                        )
                                    }
                                    {
                                        orgPayments.find(item => item.method === 2 && item.status) && (
                                            <Radio
                                                value='terminal'
                                                onClick={(e) => handleChange(2)}
                                            >
                                                {t('terminal')}
                                            </Radio>
                                        )
                                    }
                                    {
                                        data.map((item, idx) => (
                                            <Radio
                                                key={`${idx + 1}`}
                                                disabled={!item.verified}
                                                value={item.id}
                                                onClick={(e) => handleChange(3, item)}
                                            >
                                                {generateCardType(item)}
                                                <CardInfoWrapper>
                                                    {`${item.card_number.replace(/\d{4}(?=.)/g, '$& ')} ${item.name && item.name}`}
                                                    {
                                                        !item.verified && (
                                                            <VerifyCardLink onClick={() => handleActivateCard(item)}>
                                                                {t('activate')}
                                                            </VerifyCardLink>
                                                        )
                                                    }
                                                </CardInfoWrapper>
                                            </Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </PaymentMethodsWrapper>
                    </Col>
                )
            }
            <Col span={24} onClick={handleAddCard} className='add-card-wrapper'>
                <Row gutter={[12, 0]} align='middle'>
                    <Col className='plus-svg'>
                        <PlusFillSvg/>
                    </Col>
                    <Col>
                        {t('add_card')}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
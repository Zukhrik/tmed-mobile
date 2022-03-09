import React from 'react'
import {Button} from '../../../UIComponents/Button'
import {useHistory} from 'react-router-dom'
import {Col, Row} from 'antd'
import {EmptyCartSvg} from '../../../Icons/EmptyCart'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import {useTranslation} from 'react-i18next'
import {EmptyCartWrapper} from '../atoms'

export const EmptyOrderContainer = () => {
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <EmptyCartWrapper>
            <Row gutter={[0, 25]}>
                <Col span={24} className='centered-text'>
                    <Title>{t('no_orders')}</Title>
                    <Text level={5}>{t('order_something_wake_up_me')}</Text>
                </Col>
                <Col span={24} className='centered'>
                    <EmptyCartSvg/>
                </Col>
                <Col span={24} className='centered'>
                    <Button
                        variant='primary'
                        onClick={() => push('/')}
                    >
                        {t('start_ordering')}
                    </Button>
                </Col>
            </Row>
        </EmptyCartWrapper>
    )
}
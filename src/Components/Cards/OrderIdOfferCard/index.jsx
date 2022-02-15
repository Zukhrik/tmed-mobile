import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {OrderOfferIdCardWrapper} from './style'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'

export const OrderIdOfferCard = ({src, title, count, cost}) => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()
    
    return (
        <OrderOfferIdCardWrapper>
            <Row wrap={false} align='middle'>
                <Col>
                    <ImageLazyLoad
                        src={src}
                    />
                </Col>
                <Col flex={1}>
                    <Row className='offer-info'>
                        <Col span={24}>
                            <Title>{title}</Title>
                        </Col>
                        <Col span={24}>
                            {`${t('count')}: ${count}`}
                        </Col>
                        {
                            currentProfile && cost && cost > 0 && (
                                <Col span={24}>
                                    {
                                        `${t('cost')}:
                                        ${`${cost.toLocaleString('fi-Fi')} ${currentProfile.currency.code.toUpperCase()}`}`
                                    }
                                </Col>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </OrderOfferIdCardWrapper>
    )
}
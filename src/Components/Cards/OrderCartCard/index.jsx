import React from 'react'
import {Col, Row} from 'antd'
import {ShortCard} from '../ShortCard'
import {useStore} from 'effector-react'
import {OrderCartWrapper} from './style'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'

export const OrderCartCard = ({category, imgUrl, name, count, containerPath, imgSize, background, cost}) => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <OrderCartWrapper background={background}>
            <Row>
                <Col span={24} className='card-header'>
                    <ShortCard
                        name={name}
                        text={category}
                        imgUrl={imgUrl}
                        imgSize={50 || imgSize}
                        containerPath={containerPath}
                    />
                </Col>
                <Col span={24} className='card-bottom'>
                    <Text>
                        {`${count} ${t('offers')}`}
                    </Text>
                    <Title>
                        {`${cost && cost.toLocaleString('fi-Fi')}
                        ${currentProfile && currentProfile.currency && currentProfile.currency.code.toUpperCase()}`}
                    </Title>
                </Col>
            </Row>
        </OrderCartWrapper>
    )
}
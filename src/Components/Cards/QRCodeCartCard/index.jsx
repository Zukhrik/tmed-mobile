import React from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {QRCodeCartCardWrapper} from './style'
import {ShortCard} from '../ShortCard'
import {Text} from '../../../UIComponents/Typography/Text'
import {useTranslation} from 'react-i18next'

export const QRCodeCartCard = (
    {
        src,
        title,
        text,
        time,
        cost,
        count,
        url,
        specialistImg,
        specialistName,
        specialistCat
    }
) => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <QRCodeCartCardWrapper color='red'>
            <Row>
                <Col
                    span={24}
                    className='bottom-border padding'
                >
                    <ShortCard
                        imgSize={40}
                        imgUrl={src}
                        name={title}
                        text={text}
                    />
                </Col>
                <Col
                    span={24}
                    className='bottom-border padding'
                >
                    <Row justify='space-between' align='middle'>
                        <Col flex={1}>
                            <ShortCard
                                imgSize={24}
                                imgUrl={specialistImg}
                                name={specialistName}
                                text={specialistCat}
                                textSize={6}
                            />
                        </Col>
                        <Col className='card-item-wrapper'>
                            <Text
                                className='time-item-wrapper'
                                style={{color: 'var(--danger-dwed)'}}
                            >
                                {moment(time).format('HH:MM')}
                            </Text>
                            <Text className='time-item-wrapper'>{moment(time).format('DD.MM.YYYY')}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                    onClick={url}
                    className='card-item-wrapper padding'
                >
                    <Text>{`${count} ${t('offers')}`}</Text>
                    <Title>
                        {`${cost.toLocaleString('fi-Fi')} ${currentProfile.currency.code.toUpperCase()}`}
                    </Title>
                </Col>
            </Row>
        </QRCodeCartCardWrapper>
    )
}
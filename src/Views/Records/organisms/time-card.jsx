import React from 'react'
import {useTranslation} from 'react-i18next'
import {TimeCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import moment from 'moment'

export const TimeCard = ({recordDate}) => {
    const {t} = useTranslation()
    
    return (
        <TimeCardWrapper>
            <Row align='middle' gutter={[12, 12]}>
                <Col>
                    <Text>
                        <span>{t('time')}</span>
                        {moment(recordDate).format('HH:MM')}
                    </Text>
                </Col>
                <Col>
                    <Text>
                        <span>{t('date')}</span>
                        {moment(recordDate).format('DD.MM.YYYY')}
                    </Text>
                </Col>
            </Row>
        </TimeCardWrapper>
    )
}
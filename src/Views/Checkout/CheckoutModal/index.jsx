import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {MeetingTimeCard} from '../MeetingTimeCard'
import {useSpecialistDate} from '../../../Hooks/checkout'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {SpecialistWorkingTime} from '../SpecialistWorkingTime'
import {CheckoutModalWrapper, ModalSubmitButton} from '../style'

export const CheckoutModal = ({job, dateData, active, handleChange, onClose}) => {
    const {t} = useTranslation()
    const {
        date,
        hours,
        onChange,
        selectDate,
        requestData,
        renderMeetRow
    } = useSpecialistDate({job, dateData, active, handleChange})
    
    return (
        <CheckoutModalWrapper>
            <Row style={{marginBottom: 24}} gutter={[0, 20]} justify='center'>
                <Col span={24}>
                    <Title>{t('meeting_time')}</Title>
                </Col>
                <Col span={24}>
                    <Text>{t('date')}</Text>
                </Col>
                <Col span={24}>
                    <MeetingTimeCard
                        date={date}
                        handleSelect={selectDate}
                    />
                </Col>
                <Col span={24}>
                    <Text>{t('time')}</Text>
                </Col>
                <Col span={24}>
                    <SpecialistWorkingTime
                        hours={hours}
                        onChange={onChange}
                        renderMeetRow={renderMeetRow}
                        requestData={requestData}
                    />
                </Col>
            </Row>
            <ModalSubmitButton onClick={onClose}>
                <Text>{t('approve')}</Text>
            </ModalSubmitButton>
        </CheckoutModalWrapper>
    )
}
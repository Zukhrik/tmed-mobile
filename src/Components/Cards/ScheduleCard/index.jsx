import React, {useCallback} from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {ScheduleCardWrapper} from './style'
import {useTranslation} from 'react-i18next'
import {Button} from '../../../UIComponents/Button'
import {useHistory, useParams} from 'react-router-dom'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'
import {postWantingScheduleIdMount} from '../../../Models/stream-model'

export const ScheduleCard = ({alt, src, title, date, description, scheduleId, currentProfile, isWanting}) => {
    const {slug_name} = useParams()
    const {t} = useTranslation()
    const {push} = useHistory()
    
    const handleClick = useCallback(() => {
        postWantingScheduleIdMount({slug_name, schedule_id: scheduleId})
    }, [slug_name, scheduleId])
    
    return (
        <ScheduleCardWrapper>
            <Row wrap={false} gutter={[12, 0]} align='middle'>
                <Col
                    onClick={() => push(`${slug_name}/${scheduleId}`)}
                    className='schedule-card-wrapper'
                >
                    <ImageLazyLoad
                        src={src}
                        alt={alt}
                    />
                </Col>
                <Col flex={1}>
                    <Row>
                        <Col span={24} onClick={() => push(`${slug_name}/${scheduleId}`)}>
                            <Title level={5}>{title}</Title>
                        </Col>
                        <Col span={24} onClick={() => push(`${slug_name}/${scheduleId}`)}>
                            <Text>{description}</Text>
                        </Col>
                        <Col span={24}>
                            <Row justify='space-between' align='middle'>
                                <Col className='time-wrapper'>
                                    <Text>{`${t('starting_at')}: ${moment(date).format('HH:mm')}`}</Text>
                                </Col>
                                <Col>
                                    {
                                        new Date().toLocaleString() < new Date(date).toLocaleString()
                                        && !!currentProfile &&
                                        <>
                                            {
                                                isWanting
                                                    ? t('in_the_wishlist')
                                                    : (
                                                        <Button
                                                            size='s'
                                                            onClick={(e) => handleClick(e)}
                                                        >
                                                            {t('i_am_going_to_see')}
                                                        </Button>
                                                    )
                                            }
                                        </>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ScheduleCardWrapper>
    )
}
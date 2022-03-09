import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {ScheduleIdWireframeWrapper} from '../atoms'
import {Button} from '../../../UIComponents/Button'
import {Text} from '../../../UIComponents/Typography/Text'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Title} from '../../../UIComponents/Typography/Title'
import {postWantingScheduleIdMount} from '../../../Models/stream-model'
import {Container, StreamBlurBackground} from '../../../UIComponents/GlobalStyles'

export const ScheduleIdPage = (
    {
        src,
        date,
        title,
        token,
        goBack,
        isWanting,
        description,
        currentProfile
    }
) => {
    const {t} = useTranslation()
    const {slug_name, schedule_id} = useParams()
    
    const handleClick = useCallback(() => {
        postWantingScheduleIdMount({slug_name, schedule_id})
    }, [slug_name, schedule_id])
    
    return (
        <ScheduleIdWireframeWrapper>
            <FixedHeader
                goBack={goBack}
                title={title}
            />
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <StreamBlurBackground src={src}>
                        <img src={src} alt={src}/>
                    </StreamBlurBackground>
                </Col>
                <Col span={24}>
                    <Container>
                        <Row justify='space-between' align='middle'>
                            <Col>
                                <Title level={5}>{date}</Title>
                            </Col>
                            {
                                new Date().toLocaleString() < new Date(date).toLocaleString() &&
                                currentProfile && token &&
                                <Col onClick={(e) => handleClick(e)}>
                                    {
                                        !isWanting ?
                                            <Button style={{color: 'var(--primary-dwed)'}}>
                                                {t('i_am_going_to_see')}
                                            </Button>
                                            : <Text>{t('in_the_wishlist')}</Text>
                                    }
                                </Col>
                            }
                        </Row>
                    </Container>
                </Col>
                <Col span={24}>
                    <Container>
                        <Text>{description}</Text>
                    </Container>
                </Col>
            </Row>
        </ScheduleIdWireframeWrapper>
    )
}
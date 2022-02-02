import React from 'react'
import {Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {Avatar} from '../../../../UIComponents/Avatar'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Title} from '../../../../UIComponents/Typography/Title'
import {BlurBackground, LiveStreamInfoWrapper, StreamAvatarWrapper, StreamItemWrapper} from '../atoms'
import {useTranslation} from 'react-i18next'

export const StreamCard = ({src, imgUrl, title, streamPath, currentAnonsName, anonsDate, liveWatchers, live}) => {
    const {t} = useTranslation()
    
    return (
        <StreamItemWrapper>
            <BlurBackground
                src={src}
                to={streamPath}
            >
                <img src={src} alt={src}/>
            </BlurBackground>
            {
                live &&
                <LiveStreamInfoWrapper>
                    <Title level={5}>Live</Title>
                    <Text>{liveWatchers} {t('views')}</Text>
                </LiveStreamInfoWrapper>
            }
            <Row justify='space-between' wrap={false} align='middle' className='stream-owner-wrapper'>
                <Col>
                    <StreamAvatarWrapper>
                        <Avatar
                            size={48}
                            shape='circle'
                            imgUrl={imgUrl}
                        />
                    </StreamAvatarWrapper>
                </Col>
                <Col flex={1}>
                    <Row gutter={[12, 0]} justify='space-between' wrap={false} align='top'>
                        <Col span={24}>
                            <Link to={streamPath}>
                                <Title level={4}>{title}</Title>
                            </Link>
                        </Col>
                        {
                            currentAnonsName &&
                            <Col span={24}>
                                <Text level={5}>{currentAnonsName}</Text>
                            </Col>
                        }
                        {
                            anonsDate &&
                            <Col>
                                <Text
                                    color='var(--grey-dwed)'
                                >
                                    {anonsDate}
                                </Text>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        </StreamItemWrapper>
    )
}
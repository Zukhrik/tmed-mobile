import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {truncateString} from '../../../../utils/stringUtils'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Title} from '../../../../UIComponents/Typography/Title'
import {StreamBlurBackground} from '../../../../UIComponents/GlobalStyles'
import {PostDescriptionWrapper, StreamPostWrapper} from '../../style'

export const StreamPost = ({data, author}) => {
    const [show, setShow] = useState(false)
    const {t} = useTranslation()
    
    return (
        <StreamPostWrapper>
            <StreamBlurBackground src={data?.image}>
                <img src={data.image} alt={data.image}/>
            </StreamBlurBackground>
            <Row className='streamer-info' gutter={[0, 12]}>
                <Col span={24}>
                    <Row>
                        <Col>
                            <img
                                src={author.avatar}
                                alt={author.avatar}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col span={24}>
                                    <Text>{author?.name}</Text>
                                </Col>
                                <Col span={24} className='sub-text'>
                                    <Text>{author?.sub_text}</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <PostDescriptionWrapper>
                        <Title level={5}>{data.title}</Title>
                        {
                            !show
                                ? (
                                    <Text style={{paddingBottom: 12}}>
                                        {truncateString(data.description, 150)}
                                        {data.description.length > 150 &&
                                            <span onClick={() => setShow(!show)}> {t('more')}</span>}
                                    </Text>
                                ) : (
                                    <Text style={{paddingBottom: 12}}>
                                        {data.description}
                                        <span onClick={() => setShow(!show)}> {t('hide')}</span>
                                    </Text>
                                )
                        }
                    </PostDescriptionWrapper>
                </Col>
            </Row>
        </StreamPostWrapper>
    )
}
import React from 'react'
import {useHistory} from 'react-router-dom'
import {ShowSvg} from '../../../Icons/Eye'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {StreamImage, StreamInfoWrapper, TapeTypeStreamWrapper} from './style'
import {Col, Row} from 'antd'
import {ShortCard} from '../ShortCard'

export const TapeTypeStream = ({src, seen, path, name, schedule, imgSrc}) => {
    const {push} = useHistory()
    
    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <TapeTypeStreamWrapper onClick={() => push(path)}>
                    <StreamImage src={src}/>
                    <StreamInfoWrapper>
                        <Title>Live</Title>
                        <Text>
                            <ShowSvg/>
                            {seen}
                        </Text>
                    </StreamInfoWrapper>
                </TapeTypeStreamWrapper>
            </Col>
            <Col span={24}>
                <ShortCard
                    name={name}
                    imgUrl={imgSrc}
                    text={schedule}
                />
            </Col>
        </Row>
    )
}
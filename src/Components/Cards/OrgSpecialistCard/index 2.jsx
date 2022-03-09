import React from 'react'
import {Col, Row} from 'antd'
import {Avatar} from '../../../UIComponents/Avatar'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'

export const OrgSpecialistCard = ({src, name, category}) => {
    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <Avatar size={60} imgUrl={src}/>
            </Col>
            <Col span={24}>
                <Text color='var(--grey-dwed)' level={6}>{category}</Text>
            </Col>
            <Col span={24}>
                <Title>{name}</Title>
            </Col>
        </Row>
    )
}
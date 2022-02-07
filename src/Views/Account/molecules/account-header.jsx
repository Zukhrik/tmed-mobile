import React from 'react'
import {Col, Row} from 'antd'
import {Avatar} from '../../../UIComponents/Avatar'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import {AccountInfoWrapper} from '../atoms'

export const AccountHeader = ({imgUrl, name, category}) => {
    return (
        <AccountInfoWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24} className='avatar'>
                    <Avatar
                        size={96}
                        imgUrl={imgUrl}
                    />
                </Col>
                <Col span={24} className='about-account'>
                    <Title level={4}>{name}</Title>
                    <Text level={5}>{category}</Text>
                </Col>
            </Row>
        </AccountInfoWrapper>
    )
}

import React from 'react'
import {Col, Row} from 'antd'
import {peopleDegreesData} from '../../../data'

export const UserRating = () => {
    return (
        <Row gutter={[10, 0]} justify='center'>
            {
                peopleDegreesData.map((item) => {
                    const Icon = item.icon
                    return (
                        <Col
                            span='auto'
                            key={item.color}
                            style={{color: `${item.color}`}}
                        >
                            <Row align='middle' justify='center'>
                                <Col style={{textAlign: 'center'}} span='24'>
                                    <Icon/>
                                </Col>
                                <Col span='auto'>
                                    {item.count}
                                </Col>
                            </Row>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
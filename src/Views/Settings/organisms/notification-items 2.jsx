import React from 'react'
import {Col, Row, Switch} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'

export const NotificationItems = () => {
    
    return (
        <Row gutter={[0, 12]}>
            <Col span={24}>
                <Row gutter={[12, 0]} justify='space-between'>
                    <Col>
                        <Text>Pause all</Text>
                    </Col>
                    <Col>
                        <Switch defaultChecked/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
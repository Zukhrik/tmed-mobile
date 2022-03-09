import React from 'react'
import {Col, Row} from 'antd'
import {RecordsCardWrapper} from '../atoms'
import {Avatar} from '../../../UIComponents/Avatar'
import {Title} from '../../../UIComponents/Typography/Title'

export const RecordsCard = (
    {
        offeringName,
        offeringUrl,
        meetTime,
        containerPath
    }
) => {
    
    return (
        <RecordsCardWrapper onClick={containerPath}>
            <Row>
                <Col span={24}>
                    <Row justify='space-between' wrap={false} align='middle'>
                        <Col flex={1}>
                            <Row gutter={[12, 0]}>
                                <Col span={24} className='offering-name'>
                                    <Title level={5}>{offeringName}</Title>
                                </Col>
                                <Col span={24} className='meet-time'>{meetTime}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Avatar imgUrl={offeringUrl} size={48} shape='square'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </RecordsCardWrapper>
    )
}
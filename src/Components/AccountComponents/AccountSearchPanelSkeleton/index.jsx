import React from 'react'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const AccountSearchPanelSkeleton = () => {
    return (
        <Row justify='center'>
            <Col>
                <SkeletonUI variant='rect' animation='wave' width={200} height={50}/>
            </Col>
            <Col style={{margin: 12}}>
                <SkeletonUI variant='rect' animation='wave' width={26} height={26}/>
            </Col>
            <Col style={{margin: 12}}>
                <SkeletonUI variant='rect' animation='wave' width={26} height={26}/>
            </Col>
            <Col style={{margin: 12}}>
                <SkeletonUI variant='rect' animation='wave' width={26} height={26}/>
            </Col>
        </Row>
    )
}
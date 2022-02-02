import React from 'react'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const ScheduleCardSkeleton = () => {
    return (
        <>
            <Row align='middle' gutter={[0, 4]}>
                <Col span={24}>
                    <Row wrap={false} align='top'>
                        <Col style={{margin: '0 12px'}}>
                            <SkeletonUI variant='rect' animation='wave' width={80} height={120}/>
                        </Col>
                        <Col flex={1}>
                            <Row>
                                <Col span={24}>
                                    <SkeletonUI variant='text' animation='wave' width='80%'/>
                                </Col>
                                <Col span={24}>
                                    <SkeletonUI variant='text' animation='wave' width='90%' height={12}/>
                                    <SkeletonUI variant='text' animation='wave' width='85%' height={14}/>
                                    <SkeletonUI variant='text' animation='wave' width='40%' height={14}/>
                                </Col>
                                <Col span={24}>
                                    <SkeletonUI variant='text' animation='wave' width='60%'/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
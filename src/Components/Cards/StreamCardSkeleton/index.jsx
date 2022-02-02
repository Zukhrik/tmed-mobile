import React from 'react'
import {Col, Row} from 'antd'
import {SkeletonUI, SkeletonWrapper} from '../../../UIComponents/GlobalStyles'

export const StreamCardSkeleton = () => {
    return (
        <Row gutter={[0, 12]} align='middle'>
            <Col span={24}>
                <SkeletonUI variant='rect' width='100%' height={200}/>
            </Col>
            <Col span={24}>
                <Row gutter={[12, 0]} justify='space-between' wrap={false} align='top'>
                    <Col>
                        <SkeletonUI variant='circle' width={48} height={48}/>
                    </Col>
                    <Col flex={1} style={{height: 48}}>
                        <Row gutter={[0, 4]}>
                            <Col span={24}>
                                <SkeletonWrapper>
                                    <SkeletonUI variant='text' height={12} width='100%'/>
                                </SkeletonWrapper>
                            </Col>
                            <Col span={24}>
                                <SkeletonWrapper>
                                    <SkeletonUI variant='text' height={12} width='100%'/>
                                </SkeletonWrapper>
                            </Col>
                            <Col span={24}>
                                <SkeletonWrapper>
                                    <SkeletonUI variant='text' height={12} width='35%'/>
                                </SkeletonWrapper>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
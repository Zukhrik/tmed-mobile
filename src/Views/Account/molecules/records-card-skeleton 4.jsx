import React from 'react'
import {RecordsCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const RecordsCardSkeleton = () => {
    return (
        <RecordsCardWrapper>
            <Row>
                <Col span={24}>
                    <Row justify='space-between' wrap={false} align='middle' gutter={[12, 0]}>
                        <Col flex={1}>
                            <Row gutter={[12, 0]}>
                                <Col span={24}>
                                    <SkeletonUI/>
                                </Col>
                                <Col span={24}>
                                    <SkeletonUI/>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <SkeletonUI variant='rect' width={48} height={48}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </RecordsCardWrapper>
    )
}
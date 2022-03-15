import React from 'react'
import {SkeletonUI} from '../../../../UIComponents/GlobalStyles'
import {Col, Row} from 'antd'

export const OfferingGroupItemSkeleton = () => {
    
    return (
        <Row gutter={[0, 4]}>
            <Col span={24}>
                <SkeletonUI variant='rect' width={90} height={90}/>
            </Col>
            <Col span={24}>
                <SkeletonUI variant='text' width={90} height={18}/>
            </Col>
        </Row>
    )
}
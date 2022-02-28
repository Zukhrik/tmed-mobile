import React from 'react'
import {RecordsCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {ShortCardSkeleton} from '../../../Components/Cards'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const AccountRecordCardSkeleton = () => {
    return (
        <RecordsCardWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <SkeletonUI/>
                </Col>
                <Col span={24}>
                    <ShortCardSkeleton size={40}/>
                </Col>
            </Row>
        </RecordsCardWrapper>
    )
}
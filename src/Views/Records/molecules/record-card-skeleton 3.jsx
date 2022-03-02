import React from 'react'
import {RecordCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const RecordCardSkeleton = (status) => {
    return (
        <RecordCardWrapper>
            <Row gutter={[0, 10]}>
                <Col span={24}>
                    <Row wrap={false} gutter={[4, 0]} justify='space-between' align='middle'>
                        <Col flex={1}>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                        </Col>
                        <Col>
                            <SkeletonUI variant='circle' width={36} height={36}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row wrap={false}>
                        <Col className='icon-item-wrapper'>
                            <SkeletonUI variant='text' width={70} height={12}/>
                        </Col>
                        <Col className='icon-item-wrapper'>
                            <SkeletonUI variant='text' width={70} height={12}/>
                        </Col>
                        <Col className='icon-item-wrapper'>
                            <SkeletonUI variant='text' width={70} height={12}/>
                        </Col>
                    </Row>
                </Col>
                {
                    status && (
                        <Col className='buttons-wrapper' style={{marginTop: 12}}>
                            <SkeletonUI variant='rect' height={32} width={127}/>
                        </Col>
                    )
                }
            </Row>
        </RecordCardWrapper>
    )
}
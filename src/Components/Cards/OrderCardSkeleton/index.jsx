import React from 'react'
import {Col, Row} from 'antd'
import {ShortCardSkeleton} from '../index'
import {OrderCartWrapper} from '../OrderCartCard/style'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const OrderCardSkeleton = ({size, variant}) => {
    return (
        <OrderCartWrapper style={{padding: '0 12px'}}>
            <Row>
                <Col span={24} className='card-header'>
                    <ShortCardSkeleton
                        size={50 || size}
                        nameSize='16px'
                        textSize='14px'
                        variant={variant}
                    />
                </Col>
                <Col span={24} className='card-bottom' style={{height: 36}}>
                    <SkeletonUI variant='text' height={14} width={95}/>
                    <SkeletonUI variant='text' width={100} height={14}/>
                </Col>
            </Row>
        </OrderCartWrapper>
    )
}
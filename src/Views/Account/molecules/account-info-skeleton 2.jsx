import React from 'react'
import {AccountHeaderWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const AccountInfoSkeleton = () => {
    return (
        <AccountHeaderWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24} className='avatar'>
                    <SkeletonUI variant='circle' height={96} width={96}/>
                </Col>
                <Col span={24} className='about-account'>
                    <SkeletonUI variant='text'/>
                    <SkeletonUI varisnt='text'/>
                </Col>
            </Row>
        </AccountHeaderWrapper>
    )
}
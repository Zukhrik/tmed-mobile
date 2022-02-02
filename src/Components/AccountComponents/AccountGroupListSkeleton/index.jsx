import React from 'react'
import {Col, Row} from 'antd'
import {AccountGroupSkeletonWrapper} from '../style'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const AccountGroupListSkeleton = () => {
    return (
        <Row wrap={false}>
            <Col span={24}>
                <AccountGroupSkeletonWrapper>
                    <div style={{margin: 5}}>
                        <SkeletonUI variant='rect' animation='wave' width={75} height={75}/>
                        <SkeletonUI variant='text' animation='wave' width={65} style={{margin: '0 auto'}}/>
                    </div>
                    <div style={{margin: 5}}>
                        <SkeletonUI variant='rect' animation='wave' width={75} height={75}/>
                        <SkeletonUI variant='text' animation='wave' width={65} style={{margin: '0 auto'}}/>
                    </div>
                    <div style={{margin: 5}}>
                        <SkeletonUI variant='rect' animation='wave' width={75} height={75}/>
                        <SkeletonUI variant='text' animation='wave' width={65} style={{margin: '0 auto'}}/>
                    </div>
                    <div style={{margin: 5}}>
                        <SkeletonUI variant='rect' animation='wave' width={75} height={75}/>
                        <SkeletonUI variant='text' animation='wave' width={65} style={{margin: '0 auto'}}/>
                    </div>
                    <div style={{margin: 5}}>
                        <SkeletonUI variant='rect' animation='wave' width={75} height={75}/>
                        <SkeletonUI variant='text' animation='wave' width={65} style={{margin: '0 auto'}}/>
                    </div>
                </AccountGroupSkeletonWrapper>
            </Col>
        </Row>
    )
}
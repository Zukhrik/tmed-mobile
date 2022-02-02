import React from 'react'
import {QRCodeCartCardWrapper} from '../QRCodeCartCard/style'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {ShortCardSkeleton} from '../ShortCardSkeleton'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const QRCodeCartCardSkeleton = () => {
    return (
        <QRCodeCartCardWrapper style={{height: 172.84}}>
            <Row>
                <Col
                    span={24}
                    className='bottom-border padding'
                >
                    <ShortCardSkeleton
                        size={40}
                    />
                </Col>
                <Col
                    span={24}
                    className='bottom-border padding'
                >
                    <Row justify='space-between' align='middle'>
                        <Col flex={1}>
                            <ShortCardSkeleton
                                size={24}
                            />
                        </Col>
                        <Col className='card-item-wrapper'>
                            <Text className='time-item-wrapper' style={{width: 45.05}}/>
                            <Text className='time-item-wrapper' style={{width: 78.11}}/>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                    className='card-item-wrapper padding'
                >
                    <SkeletonUI variant='text' width='20%'/>
                    <SkeletonUI varinat='text' width='30%'/>
                </Col>
            </Row>
        </QRCodeCartCardWrapper>
    )
}
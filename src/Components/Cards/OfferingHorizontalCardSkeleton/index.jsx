import React from 'react'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {OfferingHorizontalCardWrapper} from '../OfferingHorizontalCard/style'

export const OfferingHorizontalCardSkeleton = () => {
    
    return (
        <OfferingHorizontalCardWrapper>
            <Row justify='space-between' align='middle' wrap={false} gutter={[12, 0]}>
                <Col>
                    <SkeletonUI variant='rect' width={95} height={95}/>
                </Col>
                <Col
                    flex={1}
                    style={{
                        height: 72,
                        display: 'flex',
                        paddingRight: 12,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <Text>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                        </Text>
                        <Title>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                        </Title>
                    </div>
                    <SkeletonUI
                        variant='text'
                        width='100%'
                        height={12}
                    />
                </Col>
            </Row>
        </OfferingHorizontalCardWrapper>
    )
}
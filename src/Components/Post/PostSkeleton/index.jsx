import React from 'react'
import {Col, Row} from 'antd'
import {postControlData} from '../../../data'
import {Text} from '../../../UIComponents/Typography/Text'
import {CardControlWrapper, IconItemWrapper, PostIndicatorItem} from '../style'
import {Container, IconBox, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {ShortCardSkeleton} from '../../Cards'

export const PostSkeleton = () => {
    
    return (
        <CardControlWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <Container>
                        <ShortCardSkeleton
                            height={40.84}
                            size={40}
                        />
                    </Container>
                </Col>
                <Col span={24}>
                    <Container>
                        <SkeletonUI variant='text' width='100%' height={12}/>
                        <SkeletonUI variant='text' width='100%' height={12}/>
                        <SkeletonUI variant='text' width='100%' height={12}/>
                    </Container>
                </Col>
                <Col span={24} style={{display: 'flex', flexDirection: 'column'}}>
                    <SkeletonUI variant='rect' width='100%' height={350}/>
                    <div className='post-indicator-wrapper'>
                        {
                            postControlData.map(item => {
                                const Icon = item.icon()
                                return (
                                    <PostIndicatorItem key={item.icon}>
                                        <Icon/>
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </PostIndicatorItem>
                                )
                            })
                        }
                    </div>
                    <Row justify='space-around'>
                        {
                            postControlData.map((item) => {
                                const Icon = item.icon()
                                return (
                                    <Col key={item.icon}>
                                        <IconItemWrapper>
                                            <IconBox color='var(--grey-dwed)'>
                                                <Icon/>
                                                <Text>
                                                    {item.title}
                                                </Text>
                                            </IconBox>
                                        </IconItemWrapper>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </CardControlWrapper>
    )
}
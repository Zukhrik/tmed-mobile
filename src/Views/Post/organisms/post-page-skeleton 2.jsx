import React from 'react'
import {Col, Row} from 'antd'
import {ShortCardSkeleton} from '../../../Components/Cards'
import {IconBox, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {postControlData} from '../../../data'
import {IconItemWrapper} from '../atoms'
import {Text} from '../../../UIComponents/Typography/Text'

export const PostPageSkeleton = () => {
    return (
        <Row gutter={[0, 12]}>
            <Col span={24} className='padding'>
                <ShortCardSkeleton size={40}/>
            </Col>
            <Col span={24}>
                <SkeletonUI variant='rect' height={250} width='100%'/>
                <Row align='middle' justify='space-around'
                     style={{borderBottom: ' 1px solid rgba(38, 38, 38, 0.1)', height: 40}}>
                    {
                        postControlData.map((item, idx) => {
                            const Icon = item.icon()
                            return (
                                <Col
                                    key={item.icon}
                                >
                                    <IconItemWrapper>
                                        <IconBox color='var(--grey-dwed)'>
                                            <Icon/>
                                        </IconBox>
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </IconItemWrapper>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
            <Col span={24} className='padding'>
                <ShortCardSkeleton size={40}/>
            </Col>
            <Col span={24} className='padding'>
                <ShortCardSkeleton size={40}/>
            </Col>
            <Col span={24} className='padding'>
                <ShortCardSkeleton size={40}/>
            </Col>
        </Row>
    )
}
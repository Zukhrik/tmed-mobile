import React from 'react'
import {Col, Row} from 'antd'
import {ProductCardSkeleton} from '../../Cards'
import {PostSkeleton} from '../../Post/PostSkeleton'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import Masorny, {ResponsiveMasonry} from 'react-responsive-masonry'
import {AccountGroupListSkeleton} from '../AccountGroupListSkeleton'
import {AccountSearchPanelSkeleton} from '../AccountSearchPanelSkeleton'

const skeleton = generateSkeleton(10, 100, 220)
export const UserPageSkeleton = ({username, organization, currentProfile}) => {
    return (
        <Row>
            <Col span={24}>
                <Row justify='space-between' style={{padding: 12}}>
                    <Col>
                        <SkeletonUI variant='rect' animation='wave' width={30} height={24}/>
                    </Col>
                    <Col>
                        <SkeletonUI variant='rect' animation='wave' width={80} height={16}/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row style={{padding: 12}} wrap={false} align='middle'>
                    <Col flex={1}>
                        <SkeletonUI variant='rect' animation='wave' width='90%' height={35}/>
                        <SkeletonUI variant='text' animation='wave' width='45%'/>
                    </Col>
                    <Col>
                        <SkeletonUI variant='circle' animation='wave' width={70} height={70}/>
                    </Col>
                </Row>
            </Col>
            <Col span={organization ? 12 : 24} style={{display: 'flex', justifyContent: 'center'}}>
                <SkeletonUI variant='rect' animation='wave' width={70} height={30}/>
            </Col>
            {
                organization &&
                <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <SkeletonUI variant='rect' animation='wave' width={70} height={30}/>
                </Col>
            }
            {
                username && skeleton.map((item, idx) => (
                    <Col
                        key={`${idx + 1}`}
                        style={{paddingTop: 12}}
                        span={24}
                    >
                        <PostSkeleton/>
                    </Col>
                ))
            }
            {
                organization &&
                <Col style={{paddingTop: 12}} span={24}>
                    <AccountSearchPanelSkeleton/>
                </Col>
            }
            {
                organization &&
                <Col style={{paddingTop: 12}}>
                    <AccountGroupListSkeleton/>
                </Col>
            }
            {
                organization &&
                <Col span={24}>
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 768: 2, 900: 3}}>
                        <Masorny gutter='12px'>
                            {
                                skeleton.map((item, idx) => (
                                    <ProductCardSkeleton
                                        key={`${idx + 1}`}
                                        imgSkeletonHeight={item}
                                    />
                                ))
                            }
                        </Masorny>
                    </ResponsiveMasonry>
                </Col>
            }
        </Row>
    )
}
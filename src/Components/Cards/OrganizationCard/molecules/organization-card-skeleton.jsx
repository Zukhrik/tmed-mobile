import React from 'react'
import {Col, Row} from 'antd'
import {degreesData} from '../../../../data'
import {OvalBgSvg} from '../../../../Icons/OvalBg'
import {IconBox, SkeletonUI, SkeletonWrapper} from '../../../../UIComponents/GlobalStyles'
import {AvatarContainerWrapper, CircleSkeletonWrapper, OrganizationCardWrapper, OrganizationInfoWrapper} from '../atoms'


export const OrganizationCardSkeleton = () => {
    return (
        <OrganizationCardWrapper>
            <SkeletonUI variant='rect' height='100%' width='100%'/>
            <OrganizationInfoWrapper>
                <AvatarContainerWrapper>
                    <OvalBgSvg/>
                    <CircleSkeletonWrapper>
                        <SkeletonUI variant='circle' width={32} height={32}/>
                    </CircleSkeletonWrapper>
                </AvatarContainerWrapper>
                <Row
                    gutter={[12, 0]}
                    align='middle'
                    justify='end'
                >
                    {
                        degreesData.map((item, idx) => {
                            const Icon = item.icon
                            return (
                                <Col
                                    key={`${idx + 1}`}
                                >
                                    <IconBox color={item.color}>
                                        <Icon/>
                                    </IconBox>
                                </Col>
                            )
                        })
                    }
                </Row>
                <SkeletonWrapper height={21}>
                    <SkeletonUI variant='text' width='100%' height={12}/>
                </SkeletonWrapper>
                <SkeletonUI variant='text' width='100%' height={12}/>
            </OrganizationInfoWrapper>
        </OrganizationCardWrapper>
    )
}
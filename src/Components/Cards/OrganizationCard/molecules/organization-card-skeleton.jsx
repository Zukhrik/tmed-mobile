import React from 'react'
import {OvalBgSvg} from '../../../../Icons/OvalBg'
import {SkeletonUI, SkeletonWrapper} from '../../../../UIComponents/GlobalStyles'
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
                <SkeletonWrapper height={21}>
                    <SkeletonUI variant='text' width='100%' height={12}/>
                </SkeletonWrapper>
                <SkeletonUI variant='text' width='100%' height={12}/>
            </OrganizationInfoWrapper>
        </OrganizationCardWrapper>
    )
}
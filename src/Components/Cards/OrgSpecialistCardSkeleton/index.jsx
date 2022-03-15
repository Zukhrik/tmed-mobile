import React from 'react'
import {OrgSpecCatCardWrapper} from '../OrgSpecialistCard/style'
import {Avatar} from '../../../UIComponents/Avatar'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const OrgSpecialistCardSkeleton = () => {
    return (
        <OrgSpecCatCardWrapper>
            <Avatar size={60}/>
            <SkeletonUI variant='text' width={75}/>
            <SkeletonUI variant='text' width={85}/>
        </OrgSpecCatCardWrapper>
    )
}
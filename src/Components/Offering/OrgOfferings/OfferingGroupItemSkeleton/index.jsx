import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {OfferingGroupItemSkeletonWrapper} from '../style'
import {SkeletonUI} from '../../../../UIComponents/GlobalStyles'
import {Avatar} from '../../../../UIComponents/Avatar'

export const OfferingGroupItemSkeleton = () => {
    const {$device} = useStore($appModel)
    
    return (
        <OfferingGroupItemSkeletonWrapper height={$device && $device !== INFO_MAT ? '113px' : ''}>
            <Avatar size={60}/>
            <SkeletonUI variant='text' width={75}/>
            <SkeletonUI variant='text' width={85}/>
        </OfferingGroupItemSkeletonWrapper>
    )
}
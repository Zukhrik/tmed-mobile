import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {OfferingGroupItemSkeletonWrapper} from '../style'
import {SkeletonUI} from '../../../../UIComponents/GlobalStyles'

export const OfferingGroupItemSkeleton = () => {
    const {$device} = useStore($appModel)
    
    return (
        <OfferingGroupItemSkeletonWrapper height={$device && $device !== INFO_MAT ? '113px' : ''}>
            <SkeletonUI
                variant='rect'
                animation='wave'
                width={$device && $device === INFO_MAT ? 110 : 75}
                height={$device && $device === INFO_MAT ? 110 : 75}
            />
            <SkeletonUI variant='text' animation='wave' width={75} style={{margin: '0 auto'}}/>
            <SkeletonUI variant='text' animation='wave' width={85} style={{margin: '0 auto'}}/>
        </OfferingGroupItemSkeletonWrapper>
    )
}
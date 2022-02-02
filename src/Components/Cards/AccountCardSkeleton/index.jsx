import React from 'react'
import {useStore} from 'effector-react'
import {ShortCardSkeleton} from '../index'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {CardWrapper} from '../AccountCard/style'

export default () => {
    const {$device} = useStore($appModel)
    return (
        <CardWrapper>
            <div style={{marginBottom: 16}}>
                <ShortCardSkeleton
                    textSize={16}
                    size={$device && $device === INFO_MAT ? 80 : 56}
                />
            </div>
            {/*<AccountCardRatingList*/}
            {/*    showSkeleton*/}
            {/*/>*/}
        </CardWrapper>
    )
}
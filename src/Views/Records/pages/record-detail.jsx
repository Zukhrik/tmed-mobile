import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {useOrder} from '../../../Hooks/order'
import {useOrderIdOffers} from '../../../Hooks/order'
import {InfoMatView, MobileView} from '../organisms'

export const RecordDetail = () => {
    useOrder()
    useOrderIdOffers()
    const {$device} = useStore($appModel)
    
    return (
        <>
            {
                $device && $device === INFO_MAT
                    ? <InfoMatView/>
                    : <MobileView/>
            }
        </>
    )
}
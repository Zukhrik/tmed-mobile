import React from 'react'
import {useOrder, useOrderIdOffers} from '../../../Hooks/order'
import {MobileView} from '../organisms'

export const RecordDetail = () => {
    useOrder()
    useOrderIdOffers()
    
    return (
        <MobileView/>
    )
}
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {getOrderIdOffersMount} from '../../Models/order-model'

const initialParams = {
    limit: 0,
    offset: 10
}

export function useOrderIdOffers() {
    const {order_id} = useParams()
    
    const getList = useCallback(() => {
        if (order_id) {
            getOrderIdOffersMount({order_id})
        }
    }, [order_id])
    
    const loadMore = useCallback((page) => {
        const params = {
            ...initialParams,
            offset: page * 10
        }
        
        getList(params)
    }, [getList])
    
    useEffect(() => {
        getList(initialParams)
    }, [getList])
    
    return {loadMore}
}
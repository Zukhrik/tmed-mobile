import {useCallback, useEffect} from 'react'
import {orderListMount} from '../../Models/order-model'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useOrderList(status) {
    const getList = useCallback((params) => {
        orderListMount(params)
    }, [])
    
    const loadMore = useCallback((page) => {
        const data = {
            params: {
                ...initialParams,
                offset: page * 10
            }
        }
        
        getList(data)
    }, [getList])
    
    useEffect(() => {
        const data = {
            clear: true,
            params: {
                limit: 10,
                offset: 0
            }
        }
        if (status) {
            data['params']['status'] = status
        } else {
            delete data['params']['status']
        }
        
        getList(data)
    }, [status, getList])
    
    return {loadMore}
}
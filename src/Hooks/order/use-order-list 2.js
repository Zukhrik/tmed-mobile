import {useCallback, useEffect} from 'react'
import {$orderModel, orderListMount, resetOrderListMount} from '../../Models/order-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useOrderList(status) {
    const getList = useCallback((params) => {
        orderListMount(params)
    }, [])
    const {$orderList: {result}} = useStore($orderModel)
    
    const loadMore = useCallback((page) => {
        if (result.nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            getList(data)
        }
        
    }, [getList, result])
    
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
        
        return () => {
            resetOrderListMount()
        }
    }, [status, getList])
    
    return {loadMore}
}
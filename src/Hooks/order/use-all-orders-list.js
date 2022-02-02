import {useCallback, useEffect} from 'react'
import {getOrderCartListMount, resetOrderCartList} from '../../Models/order-model'

export function useAllOrdersList() {
    const getOrdersList = useCallback(() => {
        getOrderCartListMount()
    }, [])
    
    useEffect(() => {
        getOrdersList()
        
        return () => {
            resetOrderCartList()
        }
    }, [getOrdersList])
}
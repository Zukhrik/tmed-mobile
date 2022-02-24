import {useEffect} from 'react'
import {
    orderInfoMount,
    resetOrderCartList,
    resetOrderDetail,
    resetOrderIdOffers,
    resetOrgOrderCart
} from '../../Models/order-model'
import {useParams} from 'react-router-dom'

export function useOrder() {
    const {order_id} = useParams()
    useEffect(() => {
        if(order_id) {
            orderInfoMount(order_id)
        }
        
        return () => {
            resetOrgOrderCart()
            resetOrderCartList()
            resetOrderIdOffers()
            resetOrderDetail()
        }
    }, [order_id])
}
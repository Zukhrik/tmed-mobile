import {createEffect} from 'effector'
import order from '../../Service/order'

export const fetchOrgOrderCarts = createEffect({
    handler: order.getOrgOrderCartList
})

export const fetchOrderCartList = createEffect({
    handler: order.getOrderCartList
})

export const fetchUpdateOrgOrderCart = createEffect({
    handler: order.updateOrgOrderCart
})

export const fetchDeleteOrderCart = createEffect({
    handler: order.deleteOrderCart
})

export const fetchOrgOrderResponsible = createEffect({
    handler: order.getOrgOrderResponsible
})

export const fetchOrder = createEffect({
    handler: order.getOrder
})

export const fetchOrderList = createEffect({
    handler: order.getOrders
})

export const fetchOrderIdOffers = createEffect({
    handler: order.getOrderIdOffers
})
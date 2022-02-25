import {createEvent} from 'effector'
import {
    fetchDeleteOrderCart,
    fetchOrder,
    fetchOrderCartList,
    fetchOrderIdOffers,
    fetchOrderList,
    fetchOrderOffersConclusions,
    fetchOrgOrderCarts,
    fetchOrgOrderResponsible,
    fetchUpdateOrgOrderCart
} from './effects'

export const getOrgOrderResponsibleMount = createEvent()
export const getOrgOrderCartsMount = createEvent()
export const getOrderIdOffersMount = createEvent()
export const resetOrderIdOffers = createEvent()
export const getOrderCartListMount = createEvent()
export const resetOrderCartList = createEvent()
export const updateOrderCartMount = createEvent()
export const deleteOrderCartMount = createEvent()
export const resetOrgOrderCart = createEvent()
export const resetOrderDetail = createEvent()
export const orderInfoMount = createEvent()
export const orderListMount = createEvent()
export const resetOrderListMount = createEvent()
export const orderOffersConclusionsMount = createEvent()

orderInfoMount.watch(fetchOrder)
orderListMount.watch(fetchOrderList)
getOrderIdOffersMount.watch(fetchOrderIdOffers)
getOrgOrderCartsMount.watch(fetchOrgOrderCarts)
getOrderCartListMount.watch(fetchOrderCartList)
deleteOrderCartMount.watch(fetchDeleteOrderCart)
updateOrderCartMount.watch(fetchUpdateOrgOrderCart)
getOrgOrderResponsibleMount.watch(fetchOrgOrderResponsible)
orderOffersConclusionsMount.watch(fetchOrderOffersConclusions)

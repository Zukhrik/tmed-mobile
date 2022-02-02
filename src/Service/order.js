import {httpDelete, httpGet, httpPost, httpPut} from './index'

export default {
    getOrder: (id) => httpGet({url: `/orders/${id}/`}),
    getOrderCartList: () => httpGet({url: '/orders/cart/'}),
    createOrder: (data) => httpPost({url: '/orders/', data}),
    getOrders: ({params}) => httpGet({url: '/orders/', params}),
    getOrderIdOffers: ({order_id}) => httpGet({url: `/orders/${order_id}/offers/`}),
    deleteOrderCart: ({offering_id}) => httpDelete({url: `/orders/cart/${offering_id}/`}),
    updateOrgOrderCart: ({offering_id, data}) => httpPut({url: `/orders/cart/${offering_id}/`, data}),
    postOrgOrderCart: ({org_slug_name, data}) => httpPost({url: `/orders/ocart/${org_slug_name}/`, data}),
    getOrgOrderCartList: ({org_slug_name, params}) => httpGet({url: `/orders/ocart/${org_slug_name}/`, params}),
    getOrgOrderResponsible: ({responsible_id, params}) => httpGet({url: `/orders/oorders/${responsible_id}/`, params})
}
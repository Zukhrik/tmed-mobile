import {combine, createStore} from 'effector'
import {commonStoreList, storeListWithKey, storeWithKey} from '../../utils/store-utils'
import {
    fetchDeleteOrderCart,
    fetchOrder,
    fetchOrderCartList,
    fetchOrderIdOffers,
    fetchOrderList,
    fetchOrderOffersConclusions,
    fetchOrgOrderCarts,
    fetchOrgOrderResponsible
} from './effects'
import {resetOrderCartList, resetOrderDetail, resetOrderIdOffers, resetOrgOrderCart} from './events'

const $orgOrderCartList = createStore({loading: false, error: false, result: {}, data: [], forceLoading: 0})
    .on(fetchOrgOrderCarts.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOrderCarts.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrgOrderCarts.done, (state, {params, result}) => {
        const processed = storeListWithKey({
            key: params.org_slug_name,
            response: result.data,
            state,
            clear: params.clear,
            limit: params.params.limit
        })
        if (params.action && result.data.results.length === 0) {
            params.action()
        }
        
        return {...state, ...processed, forceLoading: 2}
    })
    .on(fetchDeleteOrderCart.done, (state, {params}) => {
        const id = params.offering_id
        const organization = params.organization
        const data = {...state.data}
        const dataItem = data[organization].find(item => item.offering?.id === id)
        
        const total_cost = {...state.result}.total_cost - dataItem?.offering?.cost
        const count = {...state.result}.count - 1
        data[organization] = data[organization].filter(item => item.offering.id !== id)
        
        if (params.action) {
            console.log(params)
            params.action()
        }
        
        return {
            ...state, data, ...state.result.total_cost = total_cost, ...state.result.count = count
        }
    })
    .reset(resetOrgOrderCart)


const $orderCartList = createStore({loading: false, data: [], forceLoading: 0, result: {}, error: false})
    .on(fetchOrderCartList.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderCartList.fail, (state, {error}) => ({
        ...state, error, data: [], forceLoading: state.forceLoading === 2 ? state.forceLoading : 1, result: {}
    }))
    .on(fetchOrderCartList.done, (state, {result, params}) => {
        const isNoData = params?.organization &&
            result.data.findIndex(item => item.seller.slug_name === params.organization) === -1
        
        if (params?.isRedirect && params?.action && isNoData) {
            params.action()
        }
        
        return {...state, data: result.data, forceLoading: 2, result: result.data}
    })
    .reset(resetOrderCartList)

const $orgOrderResponsible = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchOrgOrderResponsible.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOrderResponsible.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchOrgOrderResponsible.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear
        })
        return {...state, ...processed}
    })

const $orderDetail = createStore({data: {}, loading: false, error: false, forceLoading: 0})
    .on(fetchOrder.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrder.fail, (state, {error}) => ({
        ...state, error, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrder.done, (state, {result, params}) => {
        const processed = storeWithKey({
            response: result.data,
            state,
            key: params
        })
        
        return {...state, ...processed, forceLoading: 2}
    })
    .reset(resetOrderDetail)

const $orderList = createStore({data: [], loading: false, result: {}, error: false, forceLoading: 0})
    .on(fetchOrderList.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderList.fail, (state, {error}) => ({
        ...state, error, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrderList.done, (state, {result, params}) => {
        const processed = commonStoreList({
            state,
            clear: params.clear,
            response: result.data,
            limit: params.params.limit
        })
        
        return {
            ...state,
            ...processed,
            forceLoading: 2
        }
    })

const $orderIdOffers = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchOrderIdOffers.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderIdOffers.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrderIdOffers.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .reset(resetOrderIdOffers)

const $orderOffersConclusions = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchOrderOffersConclusions.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderOffersConclusions.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchOrderOffersConclusions.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed}
    })


export const $orderModel = combine({
    $orgOrderResponsible,
    $orgOrderCartList,
    $orderIdOffers,
    $orderCartList,
    $orderDetail,
    $orderList,
    $orderOffersConclusions
})
import {combine, createStore} from 'effector'
import {orgListForceLoading} from './events'
import {
    fetchAllOrg,
    fetchOrgInfo,
    fetchOrgPaymentMethods,
    fetchOrgSpecialistCat,
    fetchOrgSpecialists,
    fetchSubscribeToOrg,
    fetchUnsubscribeFromOrg
} from './effects'
import {commonStoreList, storeWithKey} from '../../utils/store-utils'

const $allOrgList = createStore({loading: false, data: [], result: {}, forceLoading: 0, error: false})
    .on(fetchAllOrg.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllOrg.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchAllOrg.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {
            ...state, ...processed, forceLoading: 2
        }
    })
    .on(orgListForceLoading, (state) => ({...state, forceLoading: true}))
    .on(fetchSubscribeToOrg.done, (state, {params}) => {
        const slug_name = params.org_slug_name
        const idx = state.data.findIndex((el) => el.slug_name === slug_name)
        let newData = state.data
        if (idx !== -1) {
            const oldData = state.data[idx]
            newData = [...state.data.slice(0, idx), {
                ...oldData, subs: {...oldData.subs, subscribed: true, me: oldData.subs.me + 1}
            }, ...state.data.slice(idx + 1)]
        }
        return {...state, data: newData}
    })

const $orgSpecialistCat = createStore({
    loading: false, data: [], result: {}, forceLoading: false, error: false
})
    .on(fetchOrgSpecialistCat.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgSpecialistCat.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchOrgSpecialistCat.done, (state, {params, result}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })

const $organizationInfo = createStore({loading: false, data: {}, error: false, forceLoading: 0})
    .on(fetchOrgInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgInfo.fail, (state, {error}) => ({
        ...state, error, data: [], forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrgInfo.done, (state, {result, params: key}) => {
        const processed = storeWithKey({
            response: result.data, state, key
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .on(fetchSubscribeToOrg.done, (state, {params: {org_slug_name, action}}) => {
        const data = {...state.data}
        
        if (org_slug_name && data[org_slug_name]) {
            data[org_slug_name] = {...data[org_slug_name], subs: {...data[org_slug_name].subs, subscribed: true}}
            if (action) {
                action()
            }
        }
        
        return {...state, data}
    })
    .on(fetchUnsubscribeFromOrg.done, (state, {params: {org_slug_name, action}}) => {
        const data = {...state.data}
        
        if (org_slug_name && data[org_slug_name]) {
            data[org_slug_name] = {...data[org_slug_name], subs: {...data[org_slug_name].subs, subscribed: false}}
            if (action) {
                action()
            }
        }
        
        return {...state, data}
    })


const $orgSpecialistsList = createStore({loading: false, data: [], result: {}, forceLoading: 0, error: false})
    .on(fetchOrgSpecialists.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgSpecialists.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrgSpecialists.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })

const $orgPaymentMethods = createStore({loading: false, data: [], error: false})
    .on(fetchOrgPaymentMethods.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgPaymentMethods.fail, (state, {error}) => ({
        ...state, error, data: []
    }))
    .on(fetchOrgPaymentMethods.done, (state, {result, params}) => {
        
        return {...state, data: result.data}
    })


export const $orgModel = combine({
    $allOrgList,
    $organizationInfo,
    $orgSpecialistCat,
    $orgPaymentMethods,
    $orgSpecialistsList
})
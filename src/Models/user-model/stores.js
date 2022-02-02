import {combine, createStore} from 'effector'
import {
    fetchAllUsers,
    fetchRecommendUsers,
    fetchSubscribeToUser,
    fetchUnsubscribeFromUser,
    fetchUser,
    fetchUserSubsMe,
    fetchUserSubsMy
} from './effects'
import {idbSet} from '../../Config/db'
import {
    onlineUserMount,
    onlineUserMountFromIDB,
    subscribeToRecommendUserMount,
    unsubscribeFromFallsMount
} from './events'
import {changeSingleItemInArray, commonStoreList, storeWithKey} from '../../utils/store-utils'

const $allUserList = createStore({loading: false, data: [], result: {}, forceLoading: 0, error: false})
    .on(fetchAllUsers.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllUsers.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchAllUsers.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {
            ...state, ...processed, forceLoading: 2
        }
    })
    .on(fetchSubscribeToUser.done, (state, {params}) => {
        const getOldData = (oldData) => ({subs: {me: oldData.subs.me + 1, subscribed: true}})
        
        const newData = changeSingleItemInArray({
            arr: state.data,
            key: 'username',
            value: params.username,
            getOldData
        })
        
        if (params.option) {
            params.option()
        }
        
        return {
            ...state,
            data: newData
        }
    })
    .on(fetchUnsubscribeFromUser.done, (state, {params}) => {
        const getOldData = (oldData) => ({subs: {me: oldData.subs.me - 1, subscribed: false}})
        
        const newData = changeSingleItemInArray({
            arr: state.data,
            key: 'username',
            value: params.username,
            getOldData
        })
        
        if (params.option) {
            params.option()
        }
        
        return {
            ...state,
            data: newData
        }
    })

const $user = createStore({loading: false, data: {}, error: {}, forceLoading: 0})
    .on(fetchUser.pending, (state, loading) => ({...state, loading}))
    .on(fetchUser.fail, (state, {error}) => ({
        ...state, error, data: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchUser.done, (state, {result, params: key, clear}) => {
        const processed = storeWithKey({
            response: result.data, state, key, clear: clear
        })
        
        return {...processed, forceLoading: 2}
    })
    .on(fetchSubscribeToUser.done, (state, {params: {username, action}}) => {
        const data = {...state.data}
        if (username && data[username]) {
            data[username] = {...data[username], subs: {...data[username].subs, subscribed: true}}
            if (action) {
                action()
            }
        }
        return {...state, data}
    })
    .on(fetchUnsubscribeFromUser.done, (state, {params: {username, action}}) => {
        const data = {...state.data}
        if (username && data[username]) {
            data[username] = {...data[username], subs: {...data[username].subs, subscribed: false}}
            if (action) {
                action()
            }
        }
        return {...state, data}
    })

const $userSubsMe = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchUserSubsMe.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserSubsMe.fail, (state, {error}) => ({
        ...state, error, result: {}, data: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchUserSubsMe.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {
            ...state, ...processed, forceLoading: 2
        }
    })

const $userSubsMy = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchUserSubsMy.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserSubsMy.fail, (state, {error}) => ({
        ...state, error, result: {}, data: [], forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchUserSubsMy.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        
        return {
            ...state,
            ...processed,
            forceLoading: 2
        }
    })
    .on(unsubscribeFromFallsMount, (state, {username}) => {
        let data = [...state.data]
        const idx = data.findIndex(
            item =>
                !item.to_org
                    ? item.to_user.username === username
                    : item.to_org.slug_name === username
        )
        
        if (idx !== -1) {
            data = [...data.slice(0, idx), ...data.slice(idx + 1)]
        }
        
        return {...state, data: data}
    })

const $recommendUsers = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchRecommendUsers.pending, (state, loading) => ({...state, loading}))
    .on(fetchRecommendUsers.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchRecommendUsers.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, key: params.username, ...params.params
        })
        
        return {...state, ...processed, forceLoading: 2}
    })
    .on(subscribeToRecommendUserMount, (state, {username}) => {
        const idx = state.data.findIndex(item => item.username === username)
        
        if (idx !== -1) {
            // data = [...data.slice(0, idx), {
            //     ...data[idx].subs, subscribed: true
            // }, ...data.slice(idx + 1)]
        }
        
        return {...state}
    })
    .on(fetchSubscribeToUser.done, (state, {params}) => {
        const getOldData = (oldData) => ({subs: {me: oldData.subs.me + 1, subscribed: true}})
        
        const newData = changeSingleItemInArray({
            arr: state.data,
            key: 'username',
            value: params.username,
            getOldData
        })
        
        if (params.option) {
            params.option()
        }
        
        return {
            ...state,
            data: newData
        }
    })

const $onlineUser = createStore({data: {}})
    .on(onlineUserMount, (state, payload) => ({...state, data: {...state.data, ...payload}}))
    .on(onlineUserMountFromIDB, (state, payload) => ({...state, data: {...state.data, ...payload}}))

$onlineUser.watch((state) => {
    if (Object.values(state.data).length > 0) {
        idbSet('online_accounts', 'online_accounts', JSON.stringify(state.data))
            .then(() => {
            
            })
    }
})

export const $userModel = combine({
    $user,
    $userSubsMe,
    $userSubsMy,
    $allUserList,
    $onlineUser,
    $recommendUsers
})
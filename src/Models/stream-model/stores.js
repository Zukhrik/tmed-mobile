import {combine, createStore} from 'effector'
import {postWantingScheduleIdMount, streamChannelWSChatMount, streamLiveWatchersMount} from './events'
import {commonStoreList, storeListWithKey, storeWithKey} from '../../utils/store-utils'
import {
    fetchAllStreamList,
    fetchChannelStreamSchedule,
    fetchStream,
    fetchStreamChannelChat,
    fetchStreamScheduleId
} from './effects'

const $allStreamList = createStore({loading: false, data: [], forceLoading: 0, result: {}, error: false})
    .on(fetchAllStreamList.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllStreamList.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchAllStreamList.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })

const $stream = createStore({loading: false, data: {}, error: false, forceLoading: 0})
    .on(fetchStream.pending, (state, loading) => ({...state, loading}))
    .on(fetchStream.fail, (state, {error}) => ({
        ...state, error, data: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchStream.done, (state, {result, params}) => {
        return {...state, data: result.data, forceLoading: 2}
    })
    .on(streamLiveWatchersMount, (state, payload) => {
        let watchers = state?.data?.live_watchers
        if (payload.count) {
            watchers = Number(payload.count)
            if(state.data){
                state.data.live_watchers = watchers
            }
        }

        return {
            ...state,
            data: state.data
        }
    })

const $channelStreamScheduleList = createStore({loading: false, data: {}, result: {}, error: false, forceLoading: 0})
    .on(fetchChannelStreamSchedule.pending, (state, loading) => ({...state, loading}))
    .on(fetchChannelStreamSchedule.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchChannelStreamSchedule.done, (state, {params, result}) => {
        const processed = storeListWithKey({
            response: result.data, state, key: params.slug_name, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .on(postWantingScheduleIdMount, (state, params) => {
        const slug_name = params.slug_name
        const schedule_id = params.schedule_id
        const data = {...state.data}
        
        if (data[schedule_id]) {
            const oldData = data[slug_name]
            data[slug_name] = {...oldData, is_wanting: true}
        }
        return {...state, data}
    })

// $channelStreamScheduleList.watch(console.log)

const $streamScheduleId = createStore({loading: false, data: {}, result: {}, error: false})
    .on(fetchStreamScheduleId.pending, (state, loading) => ({...state, loading}))
    .on(fetchStreamScheduleId.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}
    }))
    .on(fetchStreamScheduleId.done, (state, {result, params}) => {
        const processed = storeWithKey({
            response: result.data, state, key: params.schedule_id, clear: params.clear, ...params.params
        })
        return {...state, ...processed}
    })
    .on(postWantingScheduleIdMount, (state, params) => {
        const schedule_id = params.schedule_id
        const slug_name = params.slug_name
        const data = {...state.data}
        
        if (data[schedule_id]) {
            const idx = data[slug_name].findIndex(item => !Array.isArray(item.id) === schedule_id)
            const oldData = data[schedule_id][idx]
            data[slug_name] = [...data[slug_name].slice(0, idx), {
                ...oldData, is_wanting: true
            }, ...data[slug_name].slice(idx + 1)]
        }
        return {...state, data}
    })

const $streamChannelChat = createStore({loading: false, error: false, data: []})
    .on(fetchStreamChannelChat.pending, (state, loading) => ({...state, loading}))
    .on(fetchStreamChannelChat.fail, (state, {error}) => ({
        ...state, error, data: []
    }))
    .on(fetchStreamChannelChat.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed}
    })
    .on(streamChannelWSChatMount, (state, payload) => {
        
        return {
            ...state,
            data: [payload, ...state.data]
        }
    })


export const $streamModel = combine({
    $stream,
    $allStreamList,
    $streamScheduleId,
    $streamChannelChat,
    $channelStreamScheduleList
})
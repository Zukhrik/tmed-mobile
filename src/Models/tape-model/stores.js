import {
    creatingPostMediaMount,
    creatingPostMount,
    deleteUnCreatedPostMediaMount,
    postMediaPercentCompletedMount,
    resetAllTapeWithTokenMount,
    resetPostMedia,
    tapeLikeMount,
    tapeRemoveLikesMount
} from './events'
import {combine, createStore} from 'effector'
import {commonStoreList} from '../../utils/store-utils'
import {fetchAllTape, fetchAuthorTape, fetchCreatingPost, fetchCreatingPostMedia, fetchDeletePost} from './effects'
import {subscribeToUserMount} from '../user-model'
import {fetchSubscribeToUser} from '../user-model/effects'

const $authorTape = createStore({loading: false, data: [], result: {}, forceLoading: 0, error: false})
    .on(fetchAuthorTape.pending, (state, loading) => ({...state, loading}))
    .on(fetchAuthorTape.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchAuthorTape.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .on(tapeLikeMount, (state, params) => {
        const post_id = params.post_id
        const author = params.author
        const data = {...state.data}
        
        if (data[author]) {
            const idx = data[author].findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
            const oldData = data[author][idx]
            data[author] = [...data[author].slice(0, idx), {
                ...oldData,
                block_data: {...oldData.block_data, is_liked: true, likes_count: oldData.block_data.likes_count + 1}
            }, ...data[author].slice(idx + 1)]
        }
        
        return {
            ...state, data
        }
    })
    .on(tapeRemoveLikesMount, (state, params) => {
        const post_id = params.post_id
        const author = params.author
        const data = {...state.data}
        if (data[author]) {
            const idx = data[author].findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
            const oldData = data[author][idx]
            if (idx !== -1) {
                data[author] = [...data[author].slice(0, idx), {
                    ...oldData,
                    block_data: {
                        ...oldData.block_data,
                        is_liked: false,
                        likes_count: oldData.block_data.likes_count - 1
                    }
                }, ...data[author].slice(idx + 1)]
            }
        }
        return {
            ...state, data
        }
    })
    .on(fetchDeletePost.done, (state, {params}) => {
        const post_id = params.post_id
        const author = params.author
        const data = {...state.data}
        if (data[author]) {
            const idx = data[author].findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
            if (idx !== -1) {
                data[author] = [...data[author].slice(0, idx), ...data[author].slice(idx + 1)]
            }
        }
        return {
            ...state, data
        }
    })
    .on(creatingPostMount, (state, {temp_data}) => {
        const {item_data, author} = temp_data
        const data = {...state.data}
        const result = {...state.result}
        
        if (data[author]) {
            data[author] = [item_data, ...data[author]]
            result[author] = {...result[author], count: result[author].count + 1}
            
            // if (action) {
            //     action()
            // }
        }
        
        return {...state, data, result}
    })
    .on(fetchCreatingPost.done, (state, {result: response, params: {temp_data}}) => {
        const {author, uuid, action} = temp_data
        const data = {...state.data}
        
        if (data[author]) {
            const idx = data[author].findIndex(item => item.id === uuid)
            const newItem = {...data[author][idx], ...response.data}
            data[author] = [...data[author].slice(0, idx), newItem, ...data[author].slice(idx + 1)]
            
            if (action) {
                action(response.data.id)
            }
        }
        return {...state, data}
    })

const $allTape = createStore({data: [], result: {}, error: false, loading: false, forceLoading: 0})
    .on(fetchAllTape.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllTape.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchAllTape.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .on(subscribeToUserMount, (state, params) => {
        const username = params.username
        let data = [...state.data]
        const usersBlockIdx = data.findIndex(item => item.block_type && item.block_type === 'users')
        
        if (usersBlockIdx !== -1) {
            const idx = data[usersBlockIdx].block_data.findIndex(item => item.username === username)
            if (idx !== -1) {
                const item = {
                    ...data[usersBlockIdx].block_data[idx], subs: {
                        subscribed: true,
                        me: data[usersBlockIdx].block_data[idx].subs.me + 1
                    }
                }
                const innerData = [
                    ...data[usersBlockIdx].block_data.slice(0, idx),
                    item,
                    ...data[usersBlockIdx].block_data.slice(idx + 1)
                ]
                data = [
                    ...state.data.slice(0, usersBlockIdx),
                    {...data[usersBlockIdx], block_data: innerData},
                    ...state.data.slice(usersBlockIdx + 1)
                ]
            }
        }
        
        return {...state, data}
    })
    .on(tapeLikeMount, (state, params) => {
        const post_id = params.post_id
        const idx = state.data.findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
        let newData = state.data
        if (idx !== -1) {
            const oldData = state.data[idx]
            newData = [...state.data.slice(0, idx), {
                ...oldData,
                block_data: {...oldData.block_data, is_liked: true, likes_count: oldData.block_data.likes_count + 1}
            }, ...state.data.slice(idx + 1)]
        }
        return {...state, data: newData}
    })
    .on(tapeRemoveLikesMount, (state, params) => {
        const post_id = params.post_id
        const idx = state.data.findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
        let newData = state.data
        if (idx !== -1) {
            const oldData = state.data[idx]
            newData = [...state.data.slice(0, idx), {
                ...oldData,
                block_data: {...oldData.block_data, is_liked: false, likes_count: oldData.block_data.likes_count - 1}
            }, ...state.data.slice(idx + 1)]
        }
        return {...state, data: newData}
    })
    .on(fetchDeletePost.done, (state, {params}) => {
        const post_id = params.post_id
        const idx = state.data.findIndex((item) => !Array.isArray(item.block_data) && item.block_data.id === post_id)
        let newData = state.data
        if (idx !== -1) {
            newData = [...state.data.slice(0, idx), ...state.data.slice(idx + 1)]
        }
        return {...state, data: newData}
    })
    .on(creatingPostMount, (state, {temp_data}) => {
        const {item_data} = temp_data
        // if (action) {
        //     action()
        // }
        const result = {...state.result, count: state.result.count + 1}
        const data = [item_data, ...state.data]
        return {...state, data, result}
    })
    .on(fetchCreatingPost.done, (state, {result: response, params: {temp_data}}) => {
        const {uuid, action} = temp_data
        let data = state.data
        
        const idx = data.findIndex(item => item.block_data.id === uuid)
        
        if (idx !== -1) {
            const newItem = {...data[idx], ...response.data}
            data = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
            
            if (!!action) {
                action(response.data.id)
            }
        }
        
        return {...state, data}
    })
    .on(fetchSubscribeToUser.done, (state, {params: {username, action}}) => {
        const idx = state.data.findIndex((item) => !Array.isArray(item.block_type) && item.block_type === 'users')
        const usersData = state.data[idx]
        const accountIdx = usersData.block_data.findIndex(item => item.username === username)
        
        if (idx && accountIdx !== -1) {
            console.log(state.data[idx].block_data[accountIdx])
            // newData = [...state.data.slice(0, idx),
            //     [...state.data[idx].block_data.slice(0, accountIdx),
            //         {...state.data[idx].block_data[accountIdx].subs, subscribed: true},
            //         ...state.data[idx].block_data.slice(accountIdx + 1)],
            //     ...state.data.slice(idx + 1)]
        }
        
        return {...state}
    })
    .reset(resetAllTapeWithTokenMount)


const $postMedia = createStore({data: [], error: false})
    .on(creatingPostMediaMount, (state, payload) => {
        return {
            ...state,
            data: [...state.data, payload.obj]
        }
    })
    .on(fetchCreatingPostMedia.done, (state, {result, params}) => {
        let data = [...state.data]
        const {obj} = params
        const idx = data.findIndex((item => item.id === obj.id))
        if (idx !== -1) {
            const item = {...data[idx], id: result.data.id, percentCompleted: 100}
            data = [...data.slice(0, idx), item, ...data.slice(idx + 1)]
        }
        return {...state, data}
    })
    .on(postMediaPercentCompletedMount, (state, payload) => {
        let data = [...state.data]
        const {id, percentCompleted} = payload
        const idx = data.findIndex((item => item.id === id))
        if (idx !== -1) {
            const item = {...data[idx], percentCompleted: percentCompleted === 100 ? 99 : percentCompleted}
            data = [...data.slice(0, idx), item, ...data.slice(idx + 1)]
        }
        return {...state, data}
    })
    .on(deleteUnCreatedPostMediaMount, (state, params) => {
        const id = params.media_id
        let data = state.data
        const idx = data.findIndex(item => item.id === id)
        
        if (idx !== -1) {
            data = [...data.slice(0, idx), ...data.slice(idx + 1)]
        }
        return {...state, data: data}
    })
    .reset(resetPostMedia)


export const $tapeModel = combine({
    $authorTape,
    $allTape,
    $postMedia
})
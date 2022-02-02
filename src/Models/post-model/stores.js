import {combine, createStore} from 'effector'
import {fetchCommentReplyList, fetchCreateComment, fetchPost, fetchPostComments, fetchPostOfferings} from './effects'
import {storeListWithKey, storeWithKey} from '../../utils/store-utils'
import {commentLikeMount, createCommentMount, deleteLikeMount, deletePostCommentMount} from './events'
import {tapeLikeMount, tapeRemoveLikesMount} from '../tape-model'

const $postOfferings = createStore({loading: false, data: {}, result: {}, error: false})
    .on(fetchPostOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchPostOfferings.fail, (state, {error}) => ({
        ...state, error, data: {}
    }))
    .on(fetchPostOfferings.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            response: result.data, key: params.post_id, state, clear: params.clear, ...params.params
        })
        return {
            ...state, ...processed
        }
    })

const $getPost = createStore({loading: false, data: {}, result: {}, forceLoading: 0, error: false})
    .on(fetchPost.pending, (state, loading) => ({...state, loading}))
    .on(fetchPost.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchPost.done, (state, {params, result}) => {
        const processed = storeWithKey({
            response: result.data, key: params.post_id, state, ...params.params
        })
        return {...state, ...processed, forceLoading: 2, result: result}
    })
    .on(tapeRemoveLikesMount, (state, {post_id}) => {
        const data = {...state.data}
        if (data[post_id]) {
            data[post_id] = {
                ...data[post_id],
                is_liked: false, likes_count: data[post_id].likes_count > 0 && data[post_id].likes_count - 1
            }
        }
        
        return {...state, data}
    })
    .on(tapeLikeMount, (state, {post_id}) => {
        const data = {...state.data}
        
        if (data[post_id]) {
            data[post_id] = {...data[post_id], is_liked: true, likes_count: data[post_id].likes_count + 1}
        }
        
        return {...state, data}
    })


const $getPostComments = createStore({loading: false, data: {}, forceLoading: 0, result: {}, error: false})
    .on(fetchPostComments.pending, (state, loading) => ({...state, loading}))
    .on(fetchPostComments.fail, (state, {error}) => ({
        ...state, error, result: {}, data: [], forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchPostComments.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            response: result.data, key: params.post_id, clear: params.clear, state, ...params.params
        })
        
        return {...state, ...processed, forceLoading: 2}
    })
    .on(createCommentMount, (state, {temp_data, post_id}) => {
        const data = {...state.data}
        
        if (data[post_id]) {
            data[post_id] = [temp_data, ...data[post_id]]
        }
        
        return {...state, data}
    })
    .on(fetchCreateComment.done, (state, {result, params}) => {
        const data = {...state.data}
        const {post_id, temp_data} = params
        const idx = !!data[post_id] && data[post_id].findIndex(item => item.id === temp_data.id)
        
        if (idx !== false && idx !== -1) {
            const item = result.data
            data[post_id] = [...data[post_id].slice(0, idx), item, ...data[post_id].slice(idx + 1)]
        }
        
        return {...state, data}
    })
    .on(commentLikeMount, (state, {post_id, comment_id}) => {
        const data = {...state.data}
        const idx = data[post_id].findIndex(item => item.id === comment_id)
        
        if (idx !== -1 && idx !== false) {
            const oldData = {...data[post_id][idx]}
            data[post_id] = [...data[post_id].slice(0, idx), {
                ...oldData, is_liked: true, likes_count: oldData.likes_count + 1
            }, ...data[post_id].slice(idx + 1)]
        }
        
        return {...state, data}
    })
    .on(deleteLikeMount, (state, {post_id, comment_id}) => {
        const data = {...state.data}
        const idx = data[post_id].findIndex(item => item.id === comment_id)
        
        if (idx !== false && idx !== -1) {
            const oldData = {...data[post_id][idx]}
            data[post_id] = [...data[post_id].slice(0, idx), {
                ...oldData, is_liked: false, likes_count: oldData.likes_count - 1
            }, ...data[post_id].slice(idx + 1)]
        }
        
        return {...state, data}
    })
    .on(deletePostCommentMount, (state, {post_id, comment_id}) => {
        const data = {...state.data}
        const idx = data[post_id].findIndex(item => item.id === comment_id)
        
        if (data[post_id]) {
            if (idx !== -1 && idx !== false) {
                data[post_id] = [...data[post_id].splice(0, idx), ...data[post_id].splice(idx + 1)]
            }
        }
        
        return {...state, data}
    })

const $commentReplyList = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchCommentReplyList.pending, (state, loading) => ({...state, loading}))
    .on(fetchCommentReplyList.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}
    }))
    .on(fetchCommentReplyList.done, (state, {result}) => {
        
        return {...state, data: result.data.results, result: result.data}
    })


export const $postModel = combine({
    $getPost,
    $postOfferings,
    $getPostComments,
    $commentReplyList
})
import {combine, createStore} from 'effector'
import {fetchUserCatList} from './effect'
import {categoryForceLoading} from './event'
import {commonStoreList} from '../../utils/store-utils'

const $categoryList = createStore({loading: false, data: [], result: {}, forceLoading: false, error: false})
    .on(fetchUserCatList.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserCatList.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: false
    }))
    .on(fetchUserCatList.done, (state, {params, result}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed}
    })
    .on(categoryForceLoading, (state) => ({
        ...state, forceLoading: true
    }))

export const $categoryModel = combine({
    $categoryList
})
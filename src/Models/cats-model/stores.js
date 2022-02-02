import {combine, createStore} from 'effector'
import {fetchCatsOfferCats, fetchCatsOrgCats} from './effects'
import {commonStoreList} from '../../utils/store-utils'


const $catsOfferCats = createStore({loading: false, data: [], error: false, result: {}, forceLoading: 0})
    .on(fetchCatsOfferCats.pending, (state, loading) => ({...state, loading}))
    .on(fetchCatsOfferCats.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchCatsOfferCats.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })

const $catsOrgCats = createStore({loading: false, data: [], error: false, result: {}})
    .on(fetchCatsOrgCats.pending, (state, loading) => ({...state, loading}))
    .on(fetchCatsOrgCats.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchCatsOrgCats.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed}
    })

export const $catsModel = combine({
    $catsOfferCats,
    $catsOrgCats
})
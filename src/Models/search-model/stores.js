import {combine, createStore} from 'effector'
import {fetchSearchList} from './effects'

const $searchList = createStore({loading: false, data: [], error: false, result: {}})
    .on(fetchSearchList.pending, (state, loading) => ({...state, loading}))
    .on(fetchSearchList.fail, (state, {error}) => ({
        ...state, error, data: []
    }))
    .on(fetchSearchList.done, (state, {result, params}) => {
        // const processed = commonStoreList({
        //     response: result.data, state, clear: params.clear, ...params.params
        // })
        return {...state, data: result.data}
    })


export const $searchModel = combine({
    $searchList
})
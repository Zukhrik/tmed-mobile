import {combine, createStore} from 'effector'
import {fetchAccountCard, fetchDeleteAccountCard} from './effects'


const $accountCard = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchAccountCard.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountCard.fail, (state, {error}) => ({...state, error, data: []}))
    .on(fetchAccountCard.done, (state, res) => {
        return {...state, data: res.result.data.results, result: res.result.data}
    })
    .on(fetchDeleteAccountCard.done, (state, params) => {
        const cardId = params.id
        const idx = state.data.findIndex(item => item.id === cardId)
        const deletingCardItem = state.data[idx]
        console.log(deletingCardItem, idx)
        
        if (cardId) {
        
        }
        
        return {...state}
    })


export const $paymentModel = combine({
    $accountCard
})
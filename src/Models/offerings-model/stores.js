import {combine, createStore} from 'effector'
import {
    fetchOfferingGallery,
    fetchOfferingInfo,
    fetchOfferings,
    fetchOfferingsCharacs,
    fetchOrgOfferGroupList,
    fetchOrgOfferings,
    fetchPeopleOfferings,
    fetchUserOfferGroupList
} from './effects'
import i18next from 'i18next'
import * as moment from 'moment'
import {PARAMS_CHARACTER_TYPE} from '../../Constants'
import {commonStoreList} from '../../utils/store-utils'
import {
    changeLoadingStatusOffering,
    changeOrgOfferingStatus,
    offeringForceLoading,
    resetOfferingModelStoreList,
    resetOrgOfferingList
} from './events'

const $offeringsList = createStore({loading: false, data: [], result: {}, forceLoading: 0, error: false})
    .on(fetchOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferings.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOfferings.done, (state, {params, result}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        
        return {...state, ...processed, forceLoading: 2}
    })
    .on(fetchOrgOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOfferings.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchOrgOfferings.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        return {...state, ...processed, forceLoading: 2}
    })
    .on(changeOrgOfferingStatus, (state, {offering_id, status, loadingStatus}) => {
        const idx = state.data.findIndex(item => item.id === offering_id)
        const newItem = {...state.data[idx], is_in_cart: status, loading: loadingStatus}
        const newData = [...state.data.slice(0, idx), {...newItem}, ...state.data.slice(idx + 1)]
        return {...state, data: newData}
    })
    .on(fetchPeopleOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchPeopleOfferings.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchPeopleOfferings.done, (state, res) => {
        const {params: {clear}} = res
        const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state, result: res.result.data, data: newData, forceLoading: false
        }
    })
    .on(offeringForceLoading, (state) => ({...state, forceLoading: true}))
    .on(changeLoadingStatusOffering, (state, payload) => {
        const {id, status} = payload
        const idx = state.data.findIndex(item => item.id === id)
        const newItem = {...state.data[idx], loading: status}
        const newData = [...state.data.slice(0, idx), {...newItem}, ...state.data.slice(idx + 1)]
        return {...state, data: newData}
    })
    .reset(resetOrgOfferingList)


const $offeringGroupList = createStore(
    {loading: false, data: [], result: {}, forceLoading: 0, error: false}
)
    .on(fetchOrgOfferGroupList.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOfferGroupList.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOrgOfferGroupList.done, (state, {result, params}) => {
        // const {params: {clear}} = res
        // const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        const processed = commonStoreList({
            response: result.data, state, clear: params.clear, ...params.params
        })
        
        return {
            ...state, ...processed, forceLoading: 2
        }
    })
    .on(fetchUserOfferGroupList.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserOfferGroupList.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchUserOfferGroupList.done, (state, res) => ({
        ...state, result: res.result.data, data: res.result.data.results
    }))
    .reset(resetOfferingModelStoreList)

const $offeringInfo = createStore({loading: false, data: {}, error: false, forceLoading: 0, result: {}})
    .on(fetchOfferingInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingInfo.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}, forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOfferingInfo.done, (state, res) => {
        return {
            ...state, data: res.result.data, result: res.result.data, forceLoading: 2
        }
    })

const $offeringsCharacs = createStore({loading: false, data: [], error: false})
    .on(fetchOfferingsCharacs.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingsCharacs.fail, (state, {error}) => ({
        ...state, error, data: []
    }))
    .on(fetchOfferingsCharacs.done, (state, res) => {
        const data = res.result.data.filter(item => item.value)
        const tmp1 = {}
        for (let i = 0; i < data.length; i++) {
            let param_value = null
            
            const type = data[i].character.character_type
            if (type === PARAMS_CHARACTER_TYPE.YEAR_FIELD) {
                param_value = i18next.t('year_n', {n: moment(data[i].value).format('YYYY')})
            } else {
                param_value = data[i].value
            }
            
            if (tmp1[`param_${data[i].character.id}`]) {
                let value = null
                if (type === PARAMS_CHARACTER_TYPE.COLOUR_FIELD) {
                    value = [...tmp1[`param_${data[i].character.id}`].value, param_value]
                } else {
                    value = `${tmp1[`param_${data[i].character.id}`].value}, ${param_value}`
                }
                
                tmp1[`param_${data[i].character.id}`] = {
                    ...data[i],
                    value
                }
            } else {
                let value = null
                if (type === PARAMS_CHARACTER_TYPE.COLOUR_FIELD) {
                    value = [param_value]
                } else {
                    value = param_value
                }
                tmp1[`param_${data[i].character.id}`] = {...data[i], value}
            }
        }
        
        return {
            ...state, data: Object.values(tmp1)
        }
    })

const $offeringGallery = createStore({loading: false, data: [], forceLoading: 0, error: false})
    .on(fetchOfferingGallery.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingGallery.fail, (state, {error}) => ({
        ...state, error, data: [], forceLoading: state.forceLoading === 2 ? state.forceLoading : 1
    }))
    .on(fetchOfferingGallery.done, (state, res) => {
        let tmp = []
        if (res.result.data.length > 0) {
            const main = res.result.data.find(item => item.main)
            if (main) {
                tmp = [{...main}, ...res.result.data.filter(item => !item.main)]
            } else {
                tmp = res.result.data
            }
        }
        return {
            ...state, data: tmp, forceLoading: 2
        }
    })

export const $offeringsModel = combine({
    $offeringInfo,
    $offeringsList,
    $offeringGallery,
    $offeringsCharacs,
    $offeringGroupList
})

import {combine, createStore} from 'effector'
import Cookies from 'js-cookie'
import {fetchCurrencies, fetchDetectLocation} from './effects'
import {
    changeAppLang,
    changeMenuOpen,
    changeSearchFocus,
    changeShowAccounts,
    changeSpecPanel,
    commentIdMount,
    deviceMount,
    onReplyCommentDataMount,
    openFastAuthMount,
    paymentMethodMount,
    saveURLMount,
    socketCountersMount,
    switchOrgGroupPanel,
    tokenMount
} from './events'
import {fetchAccountInfo, fetchUpdateAccount} from '../account-model/effects'


const defaultAppState = {
    saveURL: '',
    commentId: '',
    menuOpen: false,
    searchFocus: false,
    showAccounts: false,
    openFastAuth: false,
    showSpecPanel: false,
    onReplyCommentData: '',
    changeOrgGroupPanel: false,
    paymentMethodValue: 'cash',
    token: Cookies.get('token') || null
}

const $app = createStore(defaultAppState)
    .on(tokenMount, (state, token) => ({...state, token}))
    .on(saveURLMount, (state, saveURL) => ({...state, saveURL}))
    .on(commentIdMount, (state, commentId) => ({...state, commentId}))
    .on(changeMenuOpen, (state, status) => ({...state, menuOpen: status}))
    .on(changeSearchFocus, (state, status) => ({...state, searchFocus: status}))
    .on(changeSpecPanel, (state, status) => ({...state, showSpecPanel: status}))
    .on(openFastAuthMount, (state, status) => ({...state, openFastAuth: status}))
    .on(changeShowAccounts, (state, status) => ({...state, showAccounts: status}))
    .on(switchOrgGroupPanel, (state, status) => ({...state, changeOrgGroupPanel: status}))
    .on(paymentMethodMount, (state, paymentMethodValue) => ({...state, paymentMethodValue}))
    .on(onReplyCommentDataMount, (state, onReplyCommentData) => ({...state, onReplyCommentData}))

const $currenciesList = createStore({loading: false, data: [], error: false})
    .on(fetchCurrencies.pending, (state, loading) => ({...state, loading}))
    .on(fetchCurrencies.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchCurrencies.done, (state, res) => ({
        ...state, data: res.result.data.results
    }))

const detectionInfo = localStorage.getItem('detectionInfo')
const appLang = localStorage.getItem('lang')

const $detectLocationInfo = createStore(detectionInfo ? JSON.parse(detectionInfo) : {})
    .on(fetchDetectLocation.done, (state, res) => res.result.data)

const $appLang = createStore(appLang ? JSON.parse(appLang) : null)
    .on(fetchDetectLocation.done, (state, {result}) => result.data.lang)
    .on(fetchAccountInfo.done, (state, {result}) => {
        if (result.data.user_lang !== state) {
            return result.data.user_lang
        }
        return state
    })
    .on(fetchUpdateAccount.done, (state, {result}) => {
        if (result.data.user_lang !== state) {
            return result.data.user_lang
        }
        return state
    })
    .on(changeAppLang, (state, lang) => {
        if (state !== lang) {
            return lang
        }
        return state
    })

$detectLocationInfo.watch((state) => {
    if (Object.values(state).length > 0) {
        localStorage.setItem('detectionInfo', JSON.stringify(state))
    } else {
        localStorage.removeItem(detectionInfo)
    }
})

const $socketCounters = createStore({chatUnreadCounter: 0})
    .on(socketCountersMount, (state, payload) => ({...state, ...payload}))

const $device = createStore(null)
    .on(deviceMount, (state, payload) => (payload))


$appLang.watch(state => {
    if (state) {
        localStorage.setItem('lang', JSON.stringify(state))
    }
})

export const $appModel = combine({
    $app,
    $device,
    $currenciesList,
    $socketCounters,
    $detectLocationInfo,
    $appLang
})
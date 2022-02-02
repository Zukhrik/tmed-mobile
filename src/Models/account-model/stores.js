import {combine, createStore} from 'effector'
import {
    fetchAccountAvatars,
    fetchAccountCoupons,
    fetchAccountInfo,
    fetchAccountPData,
    fetchAccountVerify,
    fetchUpdateAccount
} from './effects'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {
    getAccountInfo,
    getLinkedUsers,
    getOrganizations,
    getSpecialisms,
    getSpecOrganizations,
    getUpdated
} from './helper'
import {PROFILE_TYPE} from '../../Constants'
import {getCurrentAccount} from './events'


const $accountInfo = createStore({loading: false, data: null, error: false})
    .on(fetchAccountInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountInfo.fail, (state, {error}) => ({
        ...state, error, data: {}
    }))
    .on(fetchAccountInfo.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))

const $accountAvatars = createStore({loading: false, result: {}, data: [], error: false})
    .on(fetchAccountAvatars.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountAvatars.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchAccountAvatars.done, (state, res) => ({
        ...state, data: res.result.data.results, error: false
    }))

const $accountPData = createStore({loading: false, data: null, error: false})
    .on(fetchAccountPData.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountPData.fail, (state, {error}) => ({
        ...state, error, data: []
    }))
    .on(fetchAccountPData.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))

const $accountVideoVerify = createStore({loading: false, data: {}, error: false})
    .on(fetchAccountVerify.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountVerify.fail, (state, {error}) => ({
        ...state, error, data: {}
    }))
    .on(fetchAccountVerify.done, (state, {result}) => {
        return {
            ...state,
            data: result
        }
    })

const currentProfile = localStorage.getItem('currentProfile')

const $profiles = createStore({
    currentProfile: currentProfile ? JSON.parse(currentProfile) : null,
    linkedUsers: [],
    organizations: [],
    accountInfo: {},
    specialisms: []
})
    .on(fetchAccountInfo.done, (state, {result: {data}, params}) => {
        const slug_name = jwtDecode(Cookies.get('token')).username
        const accountInfo = getAccountInfo(data, slug_name)
        const linkedUsers = [{...accountInfo}, ...getLinkedUsers(data.linked_users)].sort((a, b) => {
            return a.slug_name.localeCompare(b.slug_name)
        })
        const specialisms = getSpecialisms(data.specialisms, slug_name)
        const organizations = [
            ...getOrganizations(data.organizations, data),
            ...getSpecOrganizations(data.specialisms, data)
        ]
        
        if (params && params.actions) {
            params.actions()
        }
        
        const info = {
            category: data.main_cat,
            lang: data.user_lang,
            region: data.region,
            status: data.status,
            avatar: data.avatar,
            currency: data.currency || null
        }
        
        if (params && params.actions) {
            params.actions()
        }
        
        let currentAccount
        
        if (state.currentProfile) {
            if (state.currentProfile.type === PROFILE_TYPE.USER) {
                currentAccount = {...state.currentProfile, ...info}
            } else {
                
                const organization = organizations.find(item => item.slug_name === state.currentProfile.slug_name)
                
                if (organization) {
                    currentAccount = {
                        ...state.currentProfile,
                        status: organization.status,
                        category: organization.category,
                        region: organization.region
                    }
                } else {
                    currentAccount = state.currentProfile
                }
            }
        } else {
            currentAccount = accountInfo
        }
        
        return {
            ...state,
            accountInfo,
            linkedUsers,
            specialisms,
            organizations,
            currentProfile: currentAccount
        }
    })
    .on(getCurrentAccount, (state, payloads = null) => {
        let currentAccount = null
        const {organizations, linkedUsers} = state
        
        if (payloads) {
            const {type, slug_name} = payloads
            if (type === PROFILE_TYPE.ORGANIZATION) {
                currentAccount = organizations.find(item => item.slug_name === slug_name)
            }
            
            if (type === PROFILE_TYPE.USER) {
                currentAccount = linkedUsers.find(item => item.slug_name === slug_name)
            }
        }
        
        return {
            ...state,
            currentProfile: currentAccount
        }
    })
    .on(fetchUpdateAccount.done, (state, {result: {data: result}, params}) => {
        if (params && params.actions) {
            params.actions()
        }
        const {currentProfile, linkedUsers, accountInfo} = state
        const data = {
            category: result.main_cat,
            lang: result.user_lang,
            region: result.region,
            status: result.status,
            currency: result.currency || null
        }
        
        return {
            ...state,
            accountInfo: {...accountInfo, ...data},
            currentProfile: {...currentProfile, ...data},
            linkedUsers: getUpdated(linkedUsers, currentProfile.slug_name, data)
        }
    })
    .on(fetchUpdateAccount.fail, (state, {params}) => {
        if (params && params.actions) {
            params.actions(true)
        }
        return {
            ...state
        }
    })

$profiles.watch((state) => {
    const {currentProfile} = state
    if (currentProfile && Object.values(currentProfile).length > 0) {
        localStorage.setItem('currentProfile', JSON.stringify(currentProfile))
    } else {
        localStorage.removeItem('currentProfile')
    }
})


const $accountCoupons = createStore({loading: false, data: [], error: false})
    .on(fetchAccountCoupons.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountCoupons.fail, (state, {error}) => ({...state, error, data: []}))
    .on(fetchAccountCoupons.done, (state, {result}) => {
        
        return {...state, data: result.data}
    })


export const $accountModel = combine({
    $profiles,
    $accountInfo,
    $accountPData,
    $accountAvatars,
    $accountCoupons,
    $accountVideoVerify
})
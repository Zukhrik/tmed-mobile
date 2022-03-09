import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {tokenMount} from '../Models/app'
import {showMessage} from '../UIComponents/MessageNotification'

let isRefreshing = false
let refreshSubscribers = []
let devMode = null

const axiosHeaders = (config = {}) => {
    config.headers = config.headers ?? {}
    if (devMode) {
        config['headers']['dev-mode'] = devMode
    }
    return config
}

const addSuffixToRequest = (config) => {
    if (!config.headers.hideSuffix) {
        config.url = config.url.indexOf('/v1.0/api') === -1 ? `/v1.0/api${config.url}` : config.url
    }
    delete config.headers.hideSuffix
    return config
}

export const httpClient = axios.create({})

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token))
    refreshSubscribers = []
}

httpClient.interceptors.response.use(response => {
    return response
}, error => {
    const {config, response: {status, data}} = error
    const originalRequest = config
    const refreshToken = Cookies.get('refresh-token')
    if (status === 401) {
        if (refreshToken) {
            if (!isRefreshing) {
                isRefreshing = true
                axios.post(`/v1.0/api/account/token-refresh/`, {refresh: refreshToken}, {...axiosHeaders(config)})
                    .then(res => {
                        isRefreshing = false
                        onRefreshed(res.data.access)
                        const tokens = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : {}
                        if (tokens) {
                            tokens[jwtDecode(res.data.access).username] = {
                                access: res.data.access,
                                refresh: res.data.refresh
                            }
                            
                            Cookies.set('users', JSON.stringify(tokens))
                        }
                        Cookies.set('token', res.data.access)
                        tokenMount(res.data.access)
                        Cookies.set('refresh-token', res.data.refresh)
                    })
                    .catch(() => {
                        tokenMount(null)
                        Cookies.remove('token')
                        Cookies.remove('refresh-token')
                        Cookies.remove('users')
                        isRefreshing = false
                    })
            }
            
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token
                    resolve(axios(originalRequest))
                })
            })
        }
    } else if (status === 400) {
        const errorData = data.errors
        for (let i = 0; i < errorData.length; i++) {
            showMessage(errorData[i].message, 'danger')
        }
        
    } else {
        return Promise.reject(error)
    }
})

httpClient.interceptors.request.use(config => {
    let token = Cookies.get('token')
    let configParams = axiosHeaders(config)
    configParams = addSuffixToRequest(configParams)
    if (window.innerWidth === 1080) {
        configParams.headers['x-device-id'] = '4'
    } else {
        configParams.headers['x-device-id'] = '3'
    }
    
    if (token) {
        if (configParams.headers.notAuth === undefined) {
            configParams.headers = Object.assign(configParams.headers, {Authorization: 'Token ' + token})
        } else {
            delete configParams.headers.notAuth
        }
        return configParams
    } else {
        delete configParams.headers['Authorization']
        let lang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'ru'
        if (lang) {
            configParams.headers['X-Content-Lang'] = lang
        }
        return configParams
    }
})

export const httpGet = params =>
    httpClient({
        method: 'get',
        ...params
    })

export const httpPost = params =>
    httpClient({
        method: 'post',
        ...params
    })

export const httpPut = params =>
    httpClient({
        method: 'put',
        ...params
    })

export const httpPatch = params =>
    httpClient({
        method: 'patch',
        ...params
    })

export const httpDelete = params =>
    httpClient({
        method: 'delete',
        ...params
    })
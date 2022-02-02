import {httpGet, httpPatch, httpPost, httpPut} from './index'

export default {
    getAccount: () => httpGet({url: '/account/'}),
    getAccountPData: () => httpGet({url: '/account/pdata/'}),
    accountCoupons: () => httpGet({url: '/account/mycoupons/'}),
    updateAccount: ({data}) => httpPatch({url: '/account/', data}),
    getAvatars: (params) => httpGet({url: '/account/avatars/', params}),
    createAccount: (data) => httpPost({url: '/account/create/', data, headers: {notAuth: true}}),
    validateUsername: (data) => httpPost({url: '/account/validate/', data, headers: {notAuth: true}}),
    createAvatar: (data) => httpPost({
        url: '/account/avatars/', data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    updateAvatar: ({data, id}) => httpPatch({
        url: `/account/avatars/${id}/`, data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    updatePData: (data) => httpPut({
        data,
        url: '/account/pdata/',
        headers: {'Content-Type': 'multipart/form-data'}
    }),
    getVideoVerify: () => httpGet({url: '/account/video_verify/'}),
    createVideoVerify: (data) => httpPost({
        url: '/account/video_verify/',
        data,
        headers: {'Content-Type': 'multipart/form-data'}
    }),
    refreshToken: (data) => httpPost({
        url: '/account/token-refresh/', data, headers: {
            notAuth: true
        }
    })
}
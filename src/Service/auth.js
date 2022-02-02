import {httpPost} from './index'

export default {
    getToken: (data) => httpPost({url: '/account/login/', data}),
    activateCode: (data) => httpPost({url: '/account/activate/', data}),
    createFastAuth: (data) => httpPost({url: '/account/fast_auth/', data}),
    resendCode: (data) => httpPost({url: '/account/resendcode/', data, headers: {notAuth: true}})
}
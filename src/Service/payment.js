import {httpDelete, httpGet, httpPatch, httpPost} from './index'

export default {
    crateAccountCard: (data) => httpPost({url: '/payment/payme/cards/', data}),
    getAccountCard: () => httpGet({url: '/payment/payme/cards/'}),
    deleteAccountCard: ({id}) => httpDelete({url: `/payment/payme/cards/${id}/`}),
    verifyAccountCard: ({id, data}) => httpPatch({url: `/payment/payme/cards/${id}/verify/`, data}),
    changeAccountCard: ({id, data}) => httpPatch({url: `/payment/payme/cards/${id}/`, data}),
    resendPayMeCode: ({id}) => httpGet({url: `/payment/payme/cards/${id}/resend_verify_code/`})
}
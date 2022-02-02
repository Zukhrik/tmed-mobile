import {httpGet} from './index'

export default {
    getCurrencies: () => httpGet({url: '/currencies/'}),
    detectLocation: () => httpGet({url: '/regions/detect/'})
}
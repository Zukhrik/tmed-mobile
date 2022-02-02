import {httpGet} from './index'

export default {
    getUserCategory: ({params, parent}) => httpGet({url: `/cats/ucats/get_subs/${parent}/`, params})
}
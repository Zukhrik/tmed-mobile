import {httpGet} from './index'

export default {
    getUserRegion: ({params, parent}) => httpGet({url: `/regions/get_subs/${parent}/`, params})
}
import {httpGet} from './index'

export default {
    getSearchList: ({params}) => httpGet({url: `/search/`, params})
}
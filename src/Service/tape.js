import {httpGet} from './index'

export default {
    getUserTape: ({author, params}) => httpGet({url: `/tape/${author}/`, params}),
    getAllTape: ({params}) => httpGet({url: '/tape/', params})
}
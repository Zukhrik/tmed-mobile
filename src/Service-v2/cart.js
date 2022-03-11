import {httpDeleteV2, httpPostV2} from './index'
import {CLIENT_API} from '../Constants/api'

export default {
    addToCart: (data) => httpPostV2({url: `${CLIENT_API}/cart`, data}),
    removeFromCart: (id) => httpDeleteV2({url: `${CLIENT_API}/cart/${id}`})
}
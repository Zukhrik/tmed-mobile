import {httpGetV2} from './index'
import {CLIENT_API} from '../Constants/api'

export default {
    getOrgList: () => httpGetV2({url: `${CLIENT_API}/orgs`}),
    getOrgOffering: ({slug, params}) => httpGetV2({url: `https://api.dwed.biz${CLIENT_API}/orgs/${slug}/offers`, params})
}
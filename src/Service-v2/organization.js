import {httpGetV2} from './index'
import {CLIENT_API} from '../Constants/api'

export default {
    getOrgList: () => httpGetV2({url: `${CLIENT_API}/orgs`}),
    getOfferingId: (id) => httpGetV2({url: `${CLIENT_API}/offers/${id}`}),
    getOrgOffering: ({slug, params}) => httpGetV2({url: `${CLIENT_API}/orgs/${slug}/offers`, params})
}
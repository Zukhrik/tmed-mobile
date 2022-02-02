import {httpDelete, httpGet, httpPost} from './index'

export default {
    getAllOrg: ({params}) => httpGet({url: '/orgs/', params}),
    getOrgInfo: (organization) => httpGet({url: `/orgs/${organization}/`}),
    getOrgSpecialists: ({organization, params}) => httpGet({url: `/orgs/${organization}/specs/`, params}),
    getOrgOfferings: ({organization, params}) => httpGet({url: `/orgs/${organization}/offerings/`, params}),
    getOrgSpecialistCat: ({organization, params}) => httpGet({url: `/orgs/${organization}/spec_cats/`, params}),
    getOrgOfferInfo: ({organization, offering_id}) => httpGet(
        {url: `/orgs/${organization}/offerings/${offering_id}/`}
    ),
    getOrgOfferingsGroup: ({organization, params}) => httpGet(
        {url: `/orgs/${organization}/offerings_groups/`, params}
    ),
    subscribeToOrg: ({org_slug_name}) => httpPost(
        {url: `/orgs/${org_slug_name}/subs/me/`}
    ),
    unsubscribeFromOrg: ({org_slug_name}) => httpDelete(
        {url: `/orgs/${org_slug_name}/subs/me/`}
    ),
    getOrgPaymentMethods: ({org_slug_name}) => httpGet({url: `/orgs/${org_slug_name}/payment_methods/`})
}
import {httpGet} from './index'


export default {
    getCatsOfferCats: ({params, parent}) => httpGet({url: `/cats/offers_cats/get_subs/${parent}/`, params}),
    getCatsOrgCats: ({parent_slug, params}) => httpGet({url: `/cats/ocats/get_subs/${parent_slug}/`, params})
}
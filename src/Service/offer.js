import {httpGet} from './index'

export default {
    getOfferings: ({params}) => httpGet({url: '/offerings/', params}),
    getOfferingGallery: ({offering_id}) => httpGet({url: `/offerings/${offering_id}/gallery/`}),
    getOfferingsCharacs: ({offering_id}) => httpGet({url: `/offerings/${offering_id}/characs/`})
}
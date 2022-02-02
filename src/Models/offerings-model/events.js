import {createEvent} from 'effector'
import {
    fetchOfferingGallery,
    fetchOfferingInfo,
    fetchOfferings,
    fetchOfferingsCharacs,
    fetchOrgOfferGroupList,
    fetchOrgOfferings,
    fetchPeopleOfferings,
    fetchUserOfferGroupList
} from './effects'

export const offeringInfoMount = createEvent()
export const offeringsListMount = createEvent()
export const offeringForceLoading = createEvent()
export const offeringGalleryMount = createEvent()
export const offeringsCharacsMount = createEvent()
export const orgOfferingsListMount = createEvent()
export const resetOrgOfferingList = createEvent()
export const orgOfferGroupListMount = createEvent()
export const userOfferingsListMount = createEvent()
export const userOfferGroupListMount = createEvent()
export const changeOrgOfferingStatus = createEvent()
export const offeringInfoForceLoading = createEvent()
export const resetOfferingModelStoreList = createEvent()
export const changeLoadingStatusOffering = createEvent()

offeringsListMount.watch(fetchOfferings)
offeringInfoMount.watch(fetchOfferingInfo)
orgOfferingsListMount.watch(fetchOrgOfferings)
offeringGalleryMount.watch(fetchOfferingGallery)
offeringsCharacsMount.watch(fetchOfferingsCharacs)
userOfferingsListMount.watch(fetchPeopleOfferings)
orgOfferGroupListMount.watch(fetchOrgOfferGroupList)
userOfferGroupListMount.watch(fetchUserOfferGroupList)

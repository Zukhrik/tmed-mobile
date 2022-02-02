import org from '../../Service/org';
import {createEffect} from 'effector';
import user from '../../Service/user';
import offerings from '../../Service/offer';

export const fetchOfferings = createEffect({
  handler: offerings.getOfferings
})

export const fetchOrgOfferings = createEffect({
  handler: org.getOrgOfferings
})

export const fetchPeopleOfferings = createEffect({
  handler: user.getUserOfferings
})

export const fetchUserOfferGroupList = createEffect({
  handler: user.getUserOfferingsGroup
})

export const fetchOrgOfferGroupList = createEffect({
  handler: org.getOrgOfferingsGroup
})

export const fetchOfferingInfo = createEffect({
  handler: org.getOrgOfferInfo
})

export const fetchOfferingGallery = createEffect({
  handler: offerings.getOfferingGallery
})

export const fetchOfferingsCharacs = createEffect({
  handler: offerings.getOfferingsCharacs
})
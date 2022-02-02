import {createEvent} from 'effector'
import {
    fetchAllOrg,
    fetchOrgInfo,
    fetchOrgPaymentMethods,
    fetchOrgSpecialistCat,
    fetchOrgSpecialists,
    fetchSubscribeToOrg,
    fetchUnsubscribeFromOrg
} from './effects'

export const allOrgMount = createEvent()
export const orgInfoMount = createEvent()
export const orgSpecialistsMount = createEvent()
export const orgListForceLoading = createEvent()
export const subscribeToOrgMount = createEvent()
export const orgSpecialistCatMount = createEvent()
export const unsubscribeFromOrgMount = createEvent()
export const orgPaymentMethodsMount = createEvent()

allOrgMount.watch(fetchAllOrg)
orgInfoMount.watch(fetchOrgInfo)
orgSpecialistsMount.watch(fetchOrgSpecialists)
subscribeToOrgMount.watch(fetchSubscribeToOrg)
orgSpecialistCatMount.watch(fetchOrgSpecialistCat)
unsubscribeFromOrgMount.watch(fetchUnsubscribeFromOrg)
orgPaymentMethodsMount.watch(fetchOrgPaymentMethods)

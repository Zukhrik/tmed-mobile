import org from '../../Service/org'
import {createEffect} from 'effector'

export const fetchAllOrg = createEffect({
    handler: org.getAllOrg
})

export const fetchOrgInfo = createEffect({
    handler: org.getOrgInfo
})

export const fetchOrgSpecialistCat = createEffect({
    handler: org.getOrgSpecialistCat
})

export const fetchOrgSpecialists = createEffect({
    handler: org.getOrgSpecialists
})

export const fetchSubscribeToOrg = createEffect({
    handler: org.subscribeToOrg
})

export const fetchUnsubscribeFromOrg = createEffect({
    handler: org.unsubscribeFromOrg
})

export const fetchOrgPaymentMethods = createEffect({
    handler: org.getOrgPaymentMethods
})
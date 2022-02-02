import {createEvent} from 'effector/compat'
import {
    fetchAccountAvatars,
    fetchAccountCoupons,
    fetchAccountInfo,
    fetchAccountPData,
    fetchAccountVerify,
    fetchUpdateAccount
} from './effects'

export const accountPDataMount = createEvent()
export const accountInfoMount = createEvent()
export const getCurrentAccount = createEvent()
export const updateAccountMount = createEvent()
export const accountAvatarsMount = createEvent()
export const accountCouponsMount = createEvent()
export const accountVideoVerifyMount = createEvent()

accountPDataMount.watch(fetchAccountPData)
accountInfoMount.watch(fetchAccountInfo)
updateAccountMount.watch(fetchUpdateAccount)
accountAvatarsMount.watch(fetchAccountAvatars)
accountVideoVerifyMount.watch(fetchAccountVerify)
accountCouponsMount.watch(fetchAccountCoupons)

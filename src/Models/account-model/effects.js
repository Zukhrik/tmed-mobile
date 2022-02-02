import {createEffect} from 'effector/compat'
import account from '../../Service/account'

export const fetchAccountInfo = createEffect({
    handler: account.getAccount
})

export const fetchAccountAvatars = createEffect({
    handler: account.getAvatars
})

export const fetchAccountPData = createEffect({
    handler: account.getAccountPData
})

export const fetchUpdateAccount = createEffect({
    handler: account.updateAccount
})

export const fetchAccountVerify = createEffect({
    handler: account.getVideoVerify
})

export const fetchAccountCoupons = createEffect({
    handler: account.accountCoupons
})
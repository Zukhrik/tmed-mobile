import {createEffect} from 'effector'
import payment from '../../Service/payment'

export const fetchAccountCard = createEffect({
    handler: payment.getAccountCard
})

export const fetchDeleteAccountCard = createEffect({
    handler: payment.deleteAccountCard
})
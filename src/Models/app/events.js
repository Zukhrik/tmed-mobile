import {createEvent} from 'effector'
import {fetchCurrencies, fetchDetectLocation} from './effects'

export const tokenMount = createEvent()
export const deviceMount = createEvent()
export const saveURLMount = createEvent()
export const changeMenuOpen = createEvent()
export const commentIdMount = createEvent()
export const currenciesMount = createEvent()
export const changeSpecPanel = createEvent()
export const changeSearchFocus = createEvent()
export const openFastAuthMount = createEvent()
export const paymentMethodMount = createEvent()
export const switchOrgGroupPanel = createEvent()
export const changeShowAccounts = createEvent()
export const detectLocationMount = createEvent()
export const socketCountersMount = createEvent()
export const onReplyCommentDataMount = createEvent()
export const changeAppLang = createEvent()

currenciesMount.watch(fetchCurrencies)
detectLocationMount.watch(fetchDetectLocation)
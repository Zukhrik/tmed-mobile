import {createEvent} from 'effector'
import {fetchAccountCard, fetchDeleteAccountCard} from './effects'

export const accountCardMount = createEvent()
export const deleteAccountCardMount = createEvent()

accountCardMount.watch(fetchAccountCard)
deleteAccountCardMount.watch(fetchDeleteAccountCard)
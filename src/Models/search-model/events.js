import {createEvent} from 'effector'
import {fetchSearchList} from './effects'

export const searchListMount = createEvent()

searchListMount.watch(fetchSearchList)
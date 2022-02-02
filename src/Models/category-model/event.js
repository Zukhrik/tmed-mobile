import {createEvent} from 'effector';
import {fetchUserCatList} from './effect';

export const userCatListMount = createEvent()
export const categoryForceLoading = createEvent()

userCatListMount.watch(fetchUserCatList)

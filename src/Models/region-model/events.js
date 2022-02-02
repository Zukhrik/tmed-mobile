import {createEvent} from 'effector';
import {fetchUserRegion} from './effects';

export const userRegionMount = createEvent()

userRegionMount.watch(fetchUserRegion)
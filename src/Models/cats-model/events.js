import {createEvent} from 'effector'
import {fetchCatsOfferCats, fetchCatsOrgCats} from './effects'


export const catsOfferCatsMount = createEvent()
export const catsOrgCatsMount = createEvent()

catsOfferCatsMount.watch(fetchCatsOfferCats)
catsOrgCatsMount.watch(fetchCatsOrgCats)
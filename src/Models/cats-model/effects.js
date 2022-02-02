import {createEffect} from 'effector'
import cats from '../../Service/cats'


export const fetchCatsOfferCats = createEffect({
    handler: cats.getCatsOfferCats
})

export const fetchCatsOrgCats = createEffect({
    handler: cats.getCatsOrgCats
})
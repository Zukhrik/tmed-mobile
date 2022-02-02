import {createEffect} from 'effector'
import search from '../../Service/search'

export const fetchSearchList = createEffect({
    handler: search.getSearchList
})
import {createStore, combine} from 'effector';
import {fetchUserRegion} from './effects';

const $userRegion = createStore({loading: false, data: [], result: {}, error: false})
   .on(fetchUserRegion.pending, (state, loading) => ({...state, loading}))
   .on(fetchUserRegion.fail, (state, {error}) => ({
     ...state, error, data: [], result: {}
   }))
   .on(fetchUserRegion.done, (state, res) => {
     const {params: {clear}} = res
     const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]
     return {
       ...state, result: res.result.data, data: newData
     }
   })

export const $regionModel = combine({
  $userRegion
})
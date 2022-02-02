import {createEffect} from 'effector';
import region from '../../Service/region';


export const fetchUserRegion = createEffect({
  handler: region.getUserRegion
})
import {createEffect} from 'effector';
import category from '../../Service/category';

export const fetchUserCatList = createEffect({
  handler: category.getUserCategory
})


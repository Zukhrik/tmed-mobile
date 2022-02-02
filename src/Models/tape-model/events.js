import {createEvent} from 'effector'
import {
    fetchAddLikeToPost,
    fetchAllTape,
    fetchAuthorTape,
    fetchCreatingPost,
    fetchCreatingPostMedia,
    fetchDeletePost,
    fetchRemoveLikeFromPost
} from './effects'

export const allTapeMount = createEvent()
export const tapeLikeMount = createEvent()
export const resetPostMedia = createEvent()
export const deletePostMount = createEvent()
export const authorTapeMount = createEvent()
export const resetAuthorTape = createEvent()
export const creatingPostMount = createEvent()
export const tapeRemoveLikesMount = createEvent()
export const creatingPostMediaMount = createEvent()
export const resetAllTapeWithTokenMount = createEvent()
export const postMediaPercentCompletedMount = createEvent()
export const deleteUnCreatedPostMediaMount = createEvent()

allTapeMount.watch(fetchAllTape)
authorTapeMount.watch(fetchAuthorTape)
deletePostMount.watch(fetchDeletePost)
tapeLikeMount.watch(fetchAddLikeToPost)
creatingPostMount.watch(fetchCreatingPost)
tapeRemoveLikesMount.watch(fetchRemoveLikeFromPost)
creatingPostMediaMount.watch(fetchCreatingPostMedia)

import {createEvent} from 'effector'
import {
    fetchCommentReplyList,
    fetchCreateComment,
    fetchDeleteLike,
    fetchDeletePostComment,
    fetchLikeComment,
    fetchPost,
    fetchPostComments,
    fetchPostOfferings, fetchPostsMediaDelete, fetchReplyComment
} from './effects'

export const deletePostCommentMount = createEvent()
export const commentReplyListMount = createEvent()
export const createCommentMount = createEvent()
export const replyCommentMount = createEvent()
export const postOfferingMount = createEvent()
export const postCommentsMount = createEvent()
export const commentLikeMount = createEvent()
export const deletePostsMedia = createEvent()
export const deleteLikeMount = createEvent()
export const getPostMount = createEvent()
export const likeMount = createEvent()

deletePostCommentMount.watch(fetchDeletePostComment)
commentReplyListMount.watch(fetchCommentReplyList)
deletePostsMedia.watch(fetchPostsMediaDelete)
createCommentMount.watch(fetchCreateComment)
replyCommentMount.watch(fetchReplyComment)
postOfferingMount.watch(fetchPostOfferings)
postCommentsMount.watch(fetchPostComments)
commentLikeMount.watch(fetchLikeComment)
deleteLikeMount.watch(fetchDeleteLike)
getPostMount.watch(fetchPost)
likeMount.watch(fetchPost)

import post from '../../Service/post'
import {createEffect} from 'effector'

export const fetchPostOfferings = createEffect({
    handler: post.getPostOfferings
})

export const fetchPost = createEffect({
    handler: post.getPost
})

export const fetchPostComments = createEffect({
    handler: post.getPostComments
})

export const fetchCreateComment = createEffect({
    handler: post.createPostsComment
})

export const fetchLikeComment = createEffect({
    handler: post.likeComment
})

export const fetchDeleteLike = createEffect({
    handler: post.deleteLike
})

export const fetchDeletePostComment = createEffect({
    handler: post.deletePostComment
})

export const fetchReplyComment = createEffect({
    handler: post.replyToComment
})

export const fetchCommentReplyList = createEffect({
    handler: post.commentReplyList
})

export const fetchPostsMediaDelete = createEffect({
    handler: post.deletePostsMedia
})
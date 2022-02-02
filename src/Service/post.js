import {httpDelete, httpGet, httpPost} from './index'

export default {
    creatingPost: ({data}) => httpPost({url: '/posts/', data}),
    deletePost: ({post_id}) => httpDelete({url: `/posts/${post_id}/`}),
    addLikeToPost: ({post_id}) => httpPost({url: `/posts/${post_id}/likes/`}),
    getPost: ({post_id, params}) => httpGet({url: `/posts/${post_id}/`, params}),
    removeLikeFromPost: ({post_id}) => httpDelete({url: `/posts/${post_id}/likes/`}),
    createPostMediaId: ({data, post_id}) => httpPost({url: `/posts/${post_id}/medias/`, data}),
    createPostsComment: ({post_id, data}) => httpPost({url: `/posts/${post_id}/comments/`, data}),
    getPostComments: ({post_id, params}) => httpGet({url: `/posts/${post_id}/comments/`, params}),
    getPostOfferings: ({params, post_id}) => httpGet({url: `/posts/${post_id}/offerings/`, params}),
    deletePostsMedia: ({post_id, media_id}) => httpDelete({url: `/posts/${post_id}/medias/${media_id}`}),
    deletePostComment: ({post_id, comment_id}) => httpDelete({url: `/posts/${post_id}/comments/${comment_id}/`}),
    likeComment: ({post_id, comment_id, data}) => httpPost({
        url: `/posts/${post_id}/comments/${comment_id}/likes/`, data
    }),
    deleteLike: ({post_id, comment_id}) => httpDelete({url: `/posts/${post_id}/comments/${comment_id}/likes/`}),
    createPostMedia: ({data, post_id, onUploadProgress}) => httpPost({
        url: `/posts/${post_id}/medias/`, data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    }),
    replyToComment: ({post_id, comment_id, data}) => httpPost({
        url: `/posts/${post_id}/comments/${comment_id}/replies/`, data
    }),
    commentReplyList: ({post_id, comment_id}) => httpGet({
        url: `/posts/${post_id}/comments/${comment_id}/replies/`
    })
}
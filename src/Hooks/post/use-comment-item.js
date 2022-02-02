import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$appModel, commentIdMount, onReplyCommentDataMount} from '../../Models/app'
import {commentLikeMount, commentReplyListMount, deleteLikeMount, deletePostCommentMount} from '../../Models/post-model'


export function useCommentItem() {
    const {post_id} = useParams()
    const {$app: {token}} = useStore($appModel)
    
    const handleLike = (event) => {
        if (token) {
            if (!event.is_liked) {
                const params = {
                    post_id: post_id,
                    comment_id: event.id
                }
                commentLikeMount(params)
            } else {
                const params = {
                    post_id: post_id,
                    comment_id: event.id
                }
                deleteLikeMount(params)
            }
        }
    }
    
    const handleDelete = (event) => {
        if (token) {
            const params = {
                post_id: post_id,
                comment_id: event.id
            }
            deletePostCommentMount(params)
        }
    }
    
    const handleReply = (event) => {
        if (token) {
            onReplyCommentDataMount(event)
        }
    }
    
    const handleReplyList = (event) => {
        const params = {
            post_id: post_id,
            comment_id: event.id
        }
        commentReplyListMount(params)
        commentIdMount(event.id)
    }
    
    return {handleDelete, handleLike, handleReply, post_id, handleReplyList}
}
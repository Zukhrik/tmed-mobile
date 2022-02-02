import {useCallback, useEffect} from 'react'
import {useStore} from 'effector-react'
import {$postModel, commentReplyListMount} from '../../Models/post-model'
import {useParams} from 'react-router-dom'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useCommentReplyList(comment_id) {
    const {$commentReplyList: {data, result}} = useStore($postModel)
    const {post_id} = useParams()
    console.log(data, result)
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const params = {
                ...initialParams,
                offset: result.nextOffset,
                comment_id: comment_id,
                post_id: post_id
            }
            commentReplyListMount(params)
        }
    }, [result.nextOffset, comment_id, post_id])
    
    useEffect(() => {
        const params = {
            initialParams,
            post_id: post_id,
            comment_id: comment_id
        }
        commentReplyListMount(params)
    }, [comment_id, post_id])
    
    return {loadMore}
}
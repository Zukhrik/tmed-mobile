import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$postModel, postCommentsMount} from '../../Models/post-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function usePostComments() {
    const {post_id} = useParams()
    const {$getPostComments: {result}} = useStore($postModel)
    
    const loadMore = useCallback(() => {
        const data = {
            post_id: post_id,
            params: {
                ...initialParams,
                offset: result[post_id].nextOffset
            }
        }
        postCommentsMount(data)
    }, [post_id, result])
    
    useEffect(() => {
        const data = {
            clear: true,
            post_id: post_id,
            params: initialParams
        }
        postCommentsMount(data)
    }, [post_id])
    
    return {loadMore}
}
import {v4 as uuidV4} from 'uuid'
import {useState} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$accountModel} from '../../Models/account-model'
import {$appModel, onReplyCommentDataMount} from '../../Models/app'
import {createCommentMount, replyCommentMount} from '../../Models/post-model'


export function useCreatePostComment() {
    const {post_id} = useParams()
    const [comment, setComment] = useState('')
    const {$app: {onReplyCommentData}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const uuid = uuidV4()
        
        if (comment.trim().length > 0 && currentProfile) {
            const temp_data = {
                id: uuid,
                text: comment,
                date: new Date(),
                likes_count: 0,
                is_liked: false,
                sent: true,
                reply_count: onReplyCommentData ? onReplyCommentData.reply_count + 1 : 0,
                reply_to: onReplyCommentData ? onReplyCommentData.id : null,
                author: {
                    slug_name: currentProfile.slug_name,
                    avatar: currentProfile.avatar,
                    name: currentProfile.name
                }
            }
            
            const params = {
                post_id: post_id,
                data: {
                    text: comment
                },
                temp_data
            }
            
            const reply_params = {
                temp_data,
                post_id: post_id,
                comment_id: onReplyCommentData.id,
                data: {
                    text: comment,
                    reply_to: onReplyCommentData.id
                }
            }
            
            if (onReplyCommentData) {
                replyCommentMount(reply_params)
                onReplyCommentDataMount('')
            } else {
                createCommentMount(params)
            }
        }
        
        setComment('')
    }
    
    const handleCloseReply = () => {
        onReplyCommentDataMount('')
    }
    
    return {handleSubmit, comment, setComment, handleCloseReply}
}
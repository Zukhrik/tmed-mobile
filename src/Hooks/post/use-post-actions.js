import {useCallback, useState} from 'react'
import {useStore} from 'effector-react'
import {$appModel, saveURLMount} from '../../Models/app'
import {POST_ACTIONS} from '../../Constants'
import {useHistory, useParams} from 'react-router-dom'
import {$accountModel} from '../../Models/account-model'
import {tapeLikeMount, tapeRemoveLikesMount} from '../../Models/tape-model'
import {useTranslation} from 'react-i18next'


export function usePostActions(data) {
    const {t} = useTranslation()
    const {username} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {push, location: {pathname}} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [openOverlay, setOpenOverlay] = useState(false)
    
    const addMethod = useCallback((type) => {
        if (currentProfile && !!token) {
            let author = data.author.slug_name
            if (data.author.type === 'user') {
                author = `@${data.author.slug_name}`
            }
            const params = {
                post_id: data.id,
                author
            }
            if (type === POST_ACTIONS.LIKES_COUNT) {
                tapeLikeMount(params)
            }
        } else {
            setOpenOverlay(true)
        }
    }, [currentProfile, token, data])
    
    const deleteMethod = useCallback((type) => {
        if (currentProfile && !!token) {
            let author = data.author.slug_name
            if (data.author.type === 'user') {
                author = `@${data.author.slug_name}`
            }
            const params = {
                post_id: data.id,
                author
            }
            if (type === POST_ACTIONS.LIKES_COUNT) {
                tapeRemoveLikesMount(params)
            }
        }
    }, [currentProfile, token, data])
    
    const postCommentMethod = useCallback((type) => {
        if (currentProfile && !!token) {
            const params = {
                post_id: data.id
            }
            if (type === POST_ACTIONS.COMMENTS_COUNT) {
                push(`/tape/${params.post_id}`)
            }
            saveURLMount(pathname)
        } else {
            setOpenOverlay(true)
        }
    }, [currentProfile, token, data, push, pathname])
    
    const handleClick = useCallback((type) => {
        if (type === POST_ACTIONS.LIKES_COUNT) {
            if (data.is_liked) {
                deleteMethod(type)
            } else {
                addMethod(type)
            }
        }
        
        if (type === POST_ACTIONS.COMMENTS_COUNT) {
            postCommentMethod(type)
        }
        
        if (type === POST_ACTIONS.REPOST_COUNT && data?.author?.slug_name !== currentProfile?.slug_name && !!token) {
            push(`/repost/${data.id}`) && saveURLMount(pathname)
        } else {
            setOpenOverlay(true)
        }
    }, [addMethod, data, deleteMethod, postCommentMethod, push, currentProfile, token, pathname])
    
    const getStyle = (item) => {
        currentProfile && (
            currentProfile.slug_name = username
                && item.title === 'reply' && {display: 'none'}
        )
    }
    
    const generatePostIndicators = (item) => {
        switch (item.title) {
            case 'like':
                return `${data.likes_count > 0 ? data.likes_count : ''} ${t('likes')}`
            case 'comment':
                return `${data.comments_count > 0 ? data.comments_count : ''} ${t('comments')}`
            case 'share':
                return `${data.repost_count > 0 ? data.repost_count : ''} ${t('shares')}`
            default:
                return ''
        }
    }
    
    return {handleClick, getStyle, generatePostIndicators, setOpenOverlay, openOverlay}
}
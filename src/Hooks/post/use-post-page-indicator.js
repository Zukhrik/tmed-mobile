import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {tapeLikeMount, tapeRemoveLikesMount} from '../../Models/tape-model'


export function usePostPageIndicator(data) {
    const {$app: {token}} = useStore($appModel)
    
    const addLikeMethod = useCallback((event) => {
        if (!!token) {
            if (event.title === 'like' && !data.is_liked) {
                tapeLikeMount({post_id: data.id})
            }
        }
    }, [token, data])
    
    const removeLikeMethod = useCallback((event) => {
        if (!!token) {
            if (event.title === 'like') {
                tapeRemoveLikesMount({post_id: data.id})
            }
        }
    }, [token, data])
    
    const handleChangeLike = useCallback((event) => {
        if (event.title === 'like') {
            if (!data.is_liked) {
                addLikeMethod(event)
            } else {
                removeLikeMethod(event)
            }
        }
    }, [addLikeMethod, removeLikeMethod, data])
    
    return {handleChangeLike}
}
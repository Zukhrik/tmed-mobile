import {useCallback, useEffect} from 'react'
import {$userModel, recommendUsersMount} from '../../Models/user-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useRecommendUsers() {
    const {$recommendUsers: {result}} = useStore($userModel)
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const params = {
                ...initialParams,
                offset: result.nextOffset
            }
            recommendUsersMount(params)
        }
    }, [result])
    
    useEffect(() => {
        const params = {
            clear: true,
            params: initialParams
        }
        recommendUsersMount(params)
    }, [])
    
    return {loadMore}
}
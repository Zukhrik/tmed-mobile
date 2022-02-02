import {useCallback, useEffect, useState} from 'react'
import {$userModel, userSubsMeMount, userSubsMyMount} from '../../Models/user-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useUserSubs({slug_name, type}) {
    const [username, setUsername] = useState(null)
    const {$userSubsMy: {result: resultSubsMy}, $userSubsMe: {result: subsMeResult}} = useStore($userModel)
    
    const getUserSubMyList = useCallback((params) => {
        if (username) {
            const data = {
                username,
                ...params
            }
            userSubsMyMount(data)
        }
        
    }, [username])
    
    const getUserSubsMeList = useCallback((params) => {
        if (username) {
            const data = {
                username,
                ...params
            }
            userSubsMeMount(data)
        }
    }, [username])
    
    const loadMore = useCallback((type) => {
        if (type === 'my') {
            if (resultSubsMy && resultSubsMy.nextOffset) {
                const data = {
                    params: {
                        ...initialParams,
                        offset: resultSubsMy.nextOffset
                    }
                }
                getUserSubMyList(data)
            }
        }
        
        if (type === 'me') {
            if (subsMeResult && subsMeResult.nextOffset) {
                const data = {
                    params: {
                        ...initialParams,
                        offset: subsMeResult.nextOffset
                    }
                }
                getUserSubsMeList(data)
            }
        }
    }, [getUserSubMyList, getUserSubsMeList, subsMeResult, resultSubsMy])
    
    useEffect(() => {
        const data = {
            clear: true,
            params: initialParams
        }
        if (type === 'me') {
            getUserSubsMeList(data)
        } else if (type === 'my') {
            getUserSubMyList(data)
        }
    }, [getUserSubMyList, type, getUserSubsMeList])
    
    useEffect(() => {
        if (slug_name) {
            setUsername(slug_name)
        } else {
            setUsername(null)
        }
    }, [slug_name])
    
    return {
        getUserSubMyList,
        loadMore
    }
}
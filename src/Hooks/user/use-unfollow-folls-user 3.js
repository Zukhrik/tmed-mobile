import {useCallback} from 'react'
import {unsubscribeFromFallsMount} from '../../Models/user-model'

export function useUnfollowFollsUser(type) {
    const handleUnfollow = useCallback((evt) => {
        if (type === 'followers') {
            if (!evt.follower_org) {
                console.log(evt.follower_user.username)
            } else {
                console.log(evt.follower_org.slug_name)
            }
        } else if (type === 'followings') {
            if (!evt.to_org) {
                const data = {
                    username: evt?.to_user?.username
                }
                unsubscribeFromFallsMount(data)
            } else {
                console.log(evt.to_org.slug_name)
            }
        }
    }, [type])
    
    return {handleUnfollow}
}
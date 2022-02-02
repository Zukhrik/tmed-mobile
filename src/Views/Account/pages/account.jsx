import React, {useCallback} from 'react'
import {useUser} from '../../../Hooks/user'
import {useLocation, useParams} from 'react-router-dom'
import {AccountFollowers, AccountFollowings, AccountPage} from '../organisms'


export const Account = () => {
    useUser()
    const {username} = useParams()
    const {pathname} = useLocation()
    
    const generateAccountFalls = useCallback(() => {
        switch (pathname) {
            case `/@${username}/followers`:
                return <AccountFollowers/>
            case `/@${username}/followings`:
                return <AccountFollowings/>
            
            default:
                return <AccountPage/>
        }
    }, [pathname, username])
    
    
    return (
        <>
            {generateAccountFalls()}
        </>
    )
}
import React from 'react'
import {useStore} from 'effector-react'
import {$userModel} from '../../../Models/user-model'
import {useParams} from 'react-router-dom'
import {useGoBack} from '../../../Hooks/app'
import {AccountFallsWireframe} from '../template'
import {useUserSubs} from '../../../Hooks/user'
import {FollowersList} from './index'

export const AccountFollowers = () => {
    const {username} = useParams()
    const {$user: {data}} = useStore($userModel)
    const {loadMore} = useUserSubs({slug_name: username, type: 'me'})
    const {goBack} = useGoBack({pathname: `/@${username}/tape`})
    
    return (
        <AccountFallsWireframe
            goBack={goBack}
            title={data[username] && `${data[username].name} ${data[username].lastname}`}
            followers={data?.[username]?.subs?.me || ''}
            followings={data?.[username]?.subs?.my || ''}
            list={<FollowersList loadMore={() => loadMore('me')}/>}
        />
    )
}
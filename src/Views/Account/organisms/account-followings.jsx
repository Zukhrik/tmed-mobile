import React from 'react'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$userModel} from '../../../Models/user-model'
import {useUserSubs} from '../../../Hooks/user'
import {useGoBack} from '../../../Hooks/app'
import {AccountFallsWireframe} from '../template'
import {FollowingsList} from './followings-list'

export const AccountFollowings = () => {
    const {username} = useParams()
    const {$user: {data}} = useStore($userModel)
    const {loadMore} = useUserSubs({slug_name: username, type: 'my'})
    const {goBack} = useGoBack({pathname: `/@${username}/tape`})
    
    
    return (
        <AccountFallsWireframe
            goBack={goBack}
            title={data[username] && `${data[username].name} ${data[username].lastname}`}
            followers={data?.[username]?.subs?.me || ''}
            followings={data?.[username]?.subs?.my || ''}
            list={<FollowingsList loadMore={() => loadMore('my')}/>}
        />
    )
}
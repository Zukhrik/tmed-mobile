import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useSubscription} from './use-subscription'
import {$userModel} from '../../Models/user-model'
import {$accountModel} from '../../Models/account-model'

export function useUserPage() {
    const {subscribeToAccount, unsubscribeFromAccount} = useSubscription({from: 'user_info'})
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$user: {data, forceLoading}} = useStore($userModel)
    const {$app: {token}} = useStore($appModel)
    const {username} = useParams()
    const userInfo = data[username]
    const {t} = useTranslation()
    
    const getSubscription = useCallback(() => {
        let tmp = {
            text: null,
            toggle: () => false
        }
        if (!token) {
            return false
        }
        
        if (userInfo && username && currentProfile && currentProfile.slug_name !== userInfo.username) {
            const full_name = `${userInfo.lastname ? `${userInfo.lastname} ` : ''}${userInfo.name}`
            if (userInfo.subs.subscribed) {
                tmp = {
                    text: t('unsubscribe'),
                    toggle: () => unsubscribeFromAccount({slug_name: username, name: full_name})
                }
            } else {
                tmp = {
                    text: t('subscribe'),
                    toggle: () => subscribeToAccount({slug_name: username, name: full_name})
                }
            }
        }
        
        return tmp
    }, [userInfo, currentProfile, t, token, username, subscribeToAccount, unsubscribeFromAccount])
    
    return {currentProfile, token, username, userInfo, getSubscription, forceLoading}
}
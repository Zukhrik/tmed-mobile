import {useTranslation} from 'react-i18next'
import {showMessage} from '../../UIComponents/MessageNotification'
import {subscribeToOrgMount, unsubscribeFromOrgMount} from '../../Models/org-model'
import {subscribeToUserMount, unsubscribeFromUserMount} from '../../Models/user-model'

export function useSubscription({from}) {
    const {t} = useTranslation()
    
    const subscribeToAccount = ({slug_name, name}) => {
        const option = () => {
            const message = t('you_subscribed_to', {n: name})
            showMessage(message, 'success', false)
        }
        
        if (from === 'user_list' || from === 'user_info') {
            subscribeToUserMount({username: slug_name, option})
        }
        
        if (from === 'org_info' || from === 'org_list') {
            subscribeToOrgMount({org_slug_name: slug_name, option})
        }
    }
    
    const unsubscribeFromAccount = ({slug_name, name}) => {
        const option = () => {
            const message = t('you_unsubscribed_from', {n: name})
            showMessage(message, 'success', false)
        }
        
        if (from === 'user_list' || from === 'user_info') {
            unsubscribeFromUserMount({username: slug_name, option})
        }
        
        if (from === 'org_info') {
            unsubscribeFromOrgMount({org_slug_name: slug_name, option})
        }
    }
    
    return {
        subscribeToAccount,
        unsubscribeFromAccount
    }
}
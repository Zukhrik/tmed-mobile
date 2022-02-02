import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {useSubscription} from '../user'
import {$appModel} from '../../Models/app'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {$orgModel} from '../../Models/org-model'
import {useOrganization} from './use-organization'
import {$accountModel} from '../../Models/account-model'

export function useOrgSubscription() {
    useOrganization()
    const {t} = useTranslation()
    const {organization} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {$organizationInfo: {data}} = useStore($orgModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {subscribeToAccount, unsubscribeFromAccount} = useSubscription({from: 'org_info'})
    
    
    const getSubscription = useCallback(() => {
        let tmp = {
            text: null,
            toggle: () => false
        }
        if (!token) {
            return false
        }
        
        if (data && organization && data[organization] && currentProfile) {
            const org_name = data[organization]
            if (data[organization].subs && data[organization].subs.subscribed) {
                tmp = {
                    text: t('unsubscribe'),
                    toggle: () => unsubscribeFromAccount({slug_name: organization, name: org_name})
                }
            } else {
                tmp = {
                    text: t('subscribe'),
                    toggle: () => subscribeToAccount({slug_name: organization, name: org_name})
                }
            }
        }
        
        return tmp
    }, [data, currentProfile, t, token, organization, subscribeToAccount, unsubscribeFromAccount])
    
    return {getSubscription, data, currentProfile, organization}
}
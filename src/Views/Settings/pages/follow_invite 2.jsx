import React from 'react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {InviteItems} from '../organisms/invite-items'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const FollowInvite = () => {
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    return (
        <SettingsWireframe
            title={t('follow_invite')}
            goBack={goBack}
            content={<InviteItems/>}
        />
    )
}
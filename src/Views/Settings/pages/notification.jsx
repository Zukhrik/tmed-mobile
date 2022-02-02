import React from 'react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {NotificationItems} from '../organisms'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const Notification = () => {
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    return (
        <SettingsWireframe
            title={t('notification')}
            goBack={goBack}
            content={<NotificationItems/>}
        />
    )
}
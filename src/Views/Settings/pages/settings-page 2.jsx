import React from 'react'
import {useStore} from 'effector-react'
import {SettingsItems} from '../organisms'
import {useGoBack} from '../../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {$accountModel} from '../../../Models/account-model'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const SettingsPage = () => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: `/@${currentProfile && currentProfile.slug_name}/tape`})
    
    return (
        <SettingsWireframe
            goBack={goBack}
            title={t('settings')}
            content={<SettingsItems/>}
        />
    )
}
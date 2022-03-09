import React from 'react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const Overview = () => {
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings/account'})
    
    return (
        <SettingsWireframe
            goBack={goBack}
            title={t('overview')}
            content={<>Overview</>}
        />
    )
}
import React from 'react'
import {LanguageItems} from '../organisms'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const Language = () => {
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    return (
        <SettingsWireframe
            title={t('language')}
            goBack={goBack}
            content={<LanguageItems/>}
        />
    )
}
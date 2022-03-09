import React from 'react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {useLocation} from 'react-router-dom'
import {SettingsWireframe} from '../templates/settings-wireframe'
import {LoginSecurityItems} from '../organisms/login-security-items'

export const PrivacySecurity = () => {
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    const {search} = useLocation()
    
    const renderSecurityPages = () => {
        if (search.includes('change_password')) {
            return <div>change password</div>
        }
    }
    
    return (
        <>
            {renderSecurityPages()}
            {
                search.length === 0 && (
                    <SettingsWireframe
                        title={t('privacy_security')}
                        goBack={goBack}
                        content={<LoginSecurityItems/>}
                    />
                )
            }
        </>
    )
}
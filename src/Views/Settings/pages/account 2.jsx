import React from 'react'
import {Overview} from './overview'
import {AccountItems} from '../organisms'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {useLocation} from 'react-router-dom'
import {URL_VALUES} from '../../../Constants'
import {PersonalInformation} from './personal-information'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const Account = () => {
    const {t} = useTranslation()
    const {search} = useLocation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    const renderSettingsPages = () => {
        if (search.includes(URL_VALUES.PERSONAL_INFORMATION)) {
            return <PersonalInformation/>
        }
        
        if (search.includes(URL_VALUES.OVERVIEW)) {
            return <Overview/>
        }
    }
    
    return (
        <>
            {renderSettingsPages()}
            {
                search.length === 0 && (
                    <SettingsWireframe
                        title={t('account')}
                        goBack={goBack}
                        content={<AccountItems/>}
                    />
                )
            }
        </>
    )
}
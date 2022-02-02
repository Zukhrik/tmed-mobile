import React from 'react'
import {Payment} from '../organisms'
import {useTranslation} from 'react-i18next'
import {useAccountCard} from '../../../Hooks/payment'
import {useCurrencies, useGoBack} from '../../../Hooks/app'
import {SettingsWireframe} from '../templates/settings-wireframe'

export const PaymentMethod = () => {
    useCurrencies()
    useAccountCard()
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    return (
        <SettingsWireframe
            goBack={goBack}
            title={t('payment_method')}
            content={<Payment/>}
        />
    )
}
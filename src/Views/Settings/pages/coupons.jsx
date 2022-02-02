import React from 'react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {CouponItems} from '../organisms/coupon-items'
import {SettingsWireframe} from '../templates/settings-wireframe'
import {useAccountCoupons} from '../../../Hooks/account/use-account-coupons'

export const Coupons = () => {
    useAccountCoupons()
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: '/settings'})
    
    return (
        <SettingsWireframe
            title={t('coupons')}
            goBack={goBack}
            content={<CouponItems/>}
        />
    )
}
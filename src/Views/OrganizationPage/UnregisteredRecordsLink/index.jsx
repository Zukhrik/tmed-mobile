import React from 'react'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {usePushToCart} from '../../../Hooks/order'
import {Button} from '../../../UIComponents/Button'
import {useLocation, useParams} from 'react-router-dom'
import {$orderModel} from '../../../Models/order-model'

export const UnregisteredRecordsLink = () => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const {handlePush} = usePushToCart()
    const {location: {pathname}} = useLocation()
    const {$orgOrderCartList: {result}} = useStore($orderModel)
    
    return (
        <>
            {
                result?.[organization]?.count > 0
                && pathname === `/${organization}/offerings` && (
                    <Button
                        size='l'
                        variant='primary'
                        style={{width: '100%'}}
                        onClick={handlePush}
                    >
                        {`${t('issue_now')} ${result?.[organization]?.count}`}
                    </Button>
                )
            }
        </>
    )
}
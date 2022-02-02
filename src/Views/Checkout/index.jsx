import React, {useCallback} from 'react'
import {InfoCard} from './InfoCard'
import {useStore} from 'effector-react'
import {useGoBack} from '../../Hooks/app'
import {$appModel} from '../../Models/app'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {INFO_MAT} from '../../Constants/app'
import {useOrganization} from '../../Hooks/org'
import {useCheckout} from '../../Hooks/checkout'
import {Button} from '../../UIComponents/Button'
import {$orgModel} from '../../Models/org-model'
import {$orderModel} from '../../Models/order-model'
import {useHandleSurf, useOrgOrderCarts} from '../../Hooks/order'
import {RootContent, SkeletonUI} from '../../UIComponents/GlobalStyles'
import {CheckoutPageWireframe} from '../../UIComponents/Wireframe/CheckoutPageWireframe'

export const Checkout = () => {
    //Hooks
    const {t} = useTranslation()
    const {organization} = useParams()
    const {$orgOrderCartList: {data: orgOrderData}} = useStore($orderModel)
    const {$organizationInfo: {data: orgInfo, forceLoading}} = useStore($orgModel)
    const {$device} = useStore($appModel)
    
    //Custom Hooks
    useOrganization()
    useOrgOrderCarts()
    const {handleSurf, next} = useHandleSurf()
    const {comment, handleSubmit, meetDate, activeDay, setComment, payment, setPayment} = useCheckout()
    const {goBack} = useGoBack({pathname: `/records/unregistered/${organization}`})
    
    const totalCost = orgOrderData?.[organization] && orgOrderData?.[organization]?.[0]?.total_cost
    const nextTo = totalCost === 0 ? handleSubmit : !next ? handleSurf : handleSubmit
    
    const generateDisabledButton = useCallback(() => {
        if (next) {
            return !payment.id
        } else {
            return !meetDate
        }
    }, [next, meetDate, payment.id])
    
    
    return (
        <RootContent
            paddingTop={$device && $device === INFO_MAT ? '100px' : '70px'}
            height='100vh'
        >
            <CheckoutPageWireframe
                goBack={goBack}
                disabled={generateDisabledButton() && 'disabled'}
                title={!next ? t('select_meet_time') : t('payment')}
                title1={
                    forceLoading === 2
                        ? orgInfo[organization]?.name
                        : <SkeletonUI variant='text' width={320} height={12}/>
                }
                nextTo={nextTo}
                title3={!next ? t('next_to') : t('checkout')}
                infoCard={(
                    <InfoCard
                        payment={payment}
                        setPayment={setPayment}
                        comment={comment}
                        meetDate={meetDate}
                        activeDay={activeDay}
                        onChange={(value) => setComment(value)}
                    />
                )}
                link={
                    $device && $device !== INFO_MAT && forceLoading === 2 && (
                        <>
                            {
                                orgOrderData && orgOrderData?.[organization]?.[0]?.total_cost > 0
                                    ? <>
                                        {
                                            !next
                                                ? (
                                                    <Button
                                                        variant='primary'
                                                        onClick={handleSurf}
                                                        disabled={!meetDate}
                                                    >
                                                        {t('next_to')}
                                                    </Button>
                                                )
                                                : (
                                                    <Button
                                                        variant='primary'
                                                        onClick={handleSubmit}
                                                        disabled={!payment.title}
                                                    >
                                                        {t('checkout')}
                                                    </Button>
                                                )
                                        }
                                    </>
                                    : (
                                        <Button
                                            sile='l'
                                            variant='primary'
                                            disabled={!meetDate}
                                            onClick={handleSubmit}
                                        >
                                            {t('checkout')}
                                        </Button>
                                    )
                            }
                        </>
                    )
                }
            />
        </RootContent>
    )
}
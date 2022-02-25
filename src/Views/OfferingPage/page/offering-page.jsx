import React, {useEffect} from 'react'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../../Constants'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {Gallery, PageBody} from '../organisms'
import {OfferingPageWireframe} from '../template'
import {useHistory, useParams} from 'react-router-dom'
import {AuthModal} from '../../../UIComponents/AuthModal'
import {useGoBack, useUrlParams} from '../../../Hooks/app'
import {$offeringsModel} from '../../../Models/offerings-model'
import {useOfferingOrderInOfferPage} from '../../../Hooks/order'
import {useOfferingGallery, useOfferingInfo, useOfferingsCharacs} from '../../../Hooks/offerings'


export const OfferingPage = () => {
    useOfferingInfo()
    useOfferingGallery()
    useOfferingsCharacs()
    const {push} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {$offeringInfo: {data}} = useStore($offeringsModel)
    const {handleRequest, setOpenModal, openModal} = useOfferingOrderInOfferPage()
    const {goBack} = useGoBack({
        pathname: `/${organization}/offerings`
    })
    
    useEffect(() => {
        if (!urlData[URL_KEYS.SPECIALIST_ID]) {
            if (data?.responsible?.length > 0) {
                push(`?${URL_KEYS.SPECIALIST_ID}=${data?.responsible?.[0].id}`)
            }
        }
    }, [data, urlData, push])
    
    return (
        <>
            <AuthModal
                modalIsOpen={openModal}
                onCancel={() => setOpenModal(false)}
                action={handleRequest}
            />
            <OfferingPageWireframe
                goBack={goBack}
                title3={t('checkout')}
                header={<Gallery/>}
                nextTo={() => token ? handleRequest() : setOpenModal(true)}
                title={Object.values(data).length > 0 && data.org.name}
                content={<PageBody/>}
            />
        </>
    )
}
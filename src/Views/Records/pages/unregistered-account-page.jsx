import React from 'react'
import {useAddSpecialistUrl, useAllOrdersList} from '../../../Hooks/order'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useUrlParams} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {resetOrderCartList} from '../../../Models/order-model'
import {URL_KEYS} from '../../../Constants'
import {UnregisteredAccountPageWrapper} from '../atoms'
import {UnregisteredAccountPageWireframe} from '../../../UIComponents/Wireframe/UnregisteredAccountPageWireframe'
import {INFO_MAT} from '../../../Constants/app'
import {AccountSpecialists, TotalCost, UnregisteredOfferings} from '../organisms'

export const UnregisteredAccountPage = () => {
    useAllOrdersList()
    const {push} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$device, $app: {saveURL}} = useStore($appModel)
    const {currentOrg, forceLoading} = useAddSpecialistUrl()
    
    const goBack = () => {
        push({pathname: saveURL ? saveURL : `/${organization}/offerings`})
        resetOrderCartList()
    }
    
    const handlePush = () => {
        push(`/checkout/${organization}?${URL_KEYS.SPECIALIST_ID}=${urlData.specialist_id}`)
    }
    
    return (
        <UnregisteredAccountPageWrapper>
            <UnregisteredAccountPageWireframe
                goBack={() => goBack()}
                title3={t('will_continue')}
                nextTo={() => handlePush()}
                title1={currentOrg?.seller?.name}
                title={
                    forceLoading === 2
                        ? currentOrg?.seller?.name
                        : ''
                }
                // header={
                //     $device && $device !== INFO_MAT
                //     && <AccountInfo currentOrg={currentOrg} otherOrgs={otherOrgs}/>
                // }
                specCard={<AccountSpecialists/>}
                offerings={<UnregisteredOfferings/>}
            />
            {$device && $device !== INFO_MAT && <TotalCost/>}
        </UnregisteredAccountPageWrapper>
    )
}
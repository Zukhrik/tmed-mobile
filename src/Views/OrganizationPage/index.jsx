import React from 'react'
import {useStore} from 'effector-react'
import {useGoBack} from '../../Hooks/app'
import {$appModel} from '../../Models/app'
import {INFO_MAT} from '../../Constants/app'
import {usePushToCart} from '../../Hooks/order'
import {$orgModel} from '../../Models/org-model'
import {OrganizationRoute} from './OrganizationRoute'
import {useHistory, useParams} from 'react-router-dom'
import {UnregisteredRecordsLink} from './UnregisteredRecordsLink'
import {OrgOfferingGroup} from '../../Components/Offering/OrgOfferings'
import {useOrgSpecialistLists, useOrgSubscription} from '../../Hooks/org'
import {FilterPanel} from '../../Components/Offering/OrgOfferings/FilterPanel'
import {AuthorPageWireframe} from '../../UIComponents/Wireframe/AuthorPageWireframe'
import {AccountHeaderInfoMat, UserPageHeader} from '../../Components/AccountComponents'


export const OrganizationPage = () => {
    useOrgSpecialistLists()
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const {location: {pathname}} = useHistory()
    const {handlePush, result} = usePushToCart()
    const {getSubscription} = useOrgSubscription()
    const {goBack} = useGoBack({pathname: '/'})
    const {$organizationInfo: {data, forceLoading}} = useStore($orgModel)
    
    
    return (
        <AuthorPageWireframe
            goBack={goBack}
            title={data[organization]?.slug_name}
            cartCount={result?.[organization]?.count}
            handleCartClick={handlePush}
            pageHeader={
                $device && $device === INFO_MAT
                    ? <AccountHeaderInfoMat
                        forceLoading={forceLoading}
                        name={data?.[organization]?.name}
                        imgUrl={data?.[organization]?.logo}
                        category={data?.[organization]?.category?.name}
                    />
                    : <UserPageHeader
                        aesthetics={data?.[organization]?.rating?.aesthetics?.level}
                        esthetics={data?.[organization]?.rating?.ethics?.level}
                        professional={data?.[organization]?.rating?.professional?.level}
                        forceLoading={forceLoading}
                        name={data?.[organization]?.name}
                        imgUrl={data?.[organization]?.logo}
                        category={data?.[organization]?.category?.name}
                        subscription={$device && $device !== INFO_MAT && getSubscription()}
                    />}
            filterPanel={pathname === `/${organization}/offerings` && <FilterPanel/>}
            // specPanel={<OrgSpecContainer/>}
            orgGroupPanel={<OrgOfferingGroup/>}
            pushLink={<UnregisteredRecordsLink/>}
            offeringGroup={
                pathname === `/${organization}/offerings` && <OrgOfferingGroup/>
            }
            pageContent={<OrganizationRoute/>}
        />
    )
}
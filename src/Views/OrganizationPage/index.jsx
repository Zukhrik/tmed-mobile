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
import {useOrgSubscription} from '../../Hooks/org'
import {FilterPanel} from '../../Components/Offering/OrgOfferings/FilterPanel'
import {AuthorPageWireframe} from '../../UIComponents/Wireframe/AuthorPageWireframe'
import {UserPageHeader} from '../../Components/AccountComponents'


export const OrganizationPage = () => {
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
                <UserPageHeader
                    forceLoading={forceLoading}
                    name={data?.[organization]?.name}
                    imgUrl={data?.[organization]?.logo}
                    category={data?.[organization]?.category?.name}
                    subscription={$device && $device !== INFO_MAT && getSubscription()}
                />
            }
            filterPanel={pathname === `/${organization}/offerings` && <FilterPanel/>}
            pushLink={<UnregisteredRecordsLink/>}
            pageContent={<OrganizationRoute/>}
        />
    )
}
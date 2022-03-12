import React from 'react'
import {useStore} from 'effector-react'
import {useGoBack} from '../../../Hooks/app'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {usePushToCart} from '../../../Hooks/order'
import {$orgModel} from '../../../Models/org-model'
import {useParams} from 'react-router-dom'
import {useOrgSubscription} from '../../../Hooks/org'
import {InfoInFixedHeader} from '../../../Components/AccountComponents'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Col, Row} from 'antd'
import {FilterPanel, OrgBodyRoute, OrgPageHeader} from '../organisms'

export const OrganizationPage = () => {
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const {handlePush, result} = usePushToCart()
    const {getSubscription} = useOrgSubscription()
    const {goBack} = useGoBack({pathname: '/'})
    const {$organizationInfo: {data, forceLoading}} = useStore($orgModel)
    
    return (
        <RootContent height='100vh' paddingBottom={65} paddingTop={62}>
            <FixedHeader
                component={<InfoInFixedHeader
                    title={data[organization]?.slug_name}
                    goBack={goBack}
                    cartCount={result?.[organization]?.count}
                    handleCartClick={handlePush}
                />}
            />
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <OrgPageHeader
                        forceLoading={forceLoading}
                        name={data?.[organization]?.name}
                        imgUrl={data?.[organization]?.logo}
                        category={data?.[organization]?.category?.name}
                        subscription={$device && $device !== INFO_MAT && getSubscription()}
                    />
                </Col>
                <Col span={24}>
                    <FilterPanel/>
                </Col>
                <Col span={24} className='container'>
                    <OrgBodyRoute/>
                </Col>
            </Row>
        </RootContent>
    )
}
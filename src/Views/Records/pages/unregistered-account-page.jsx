import React from 'react'
import {useAddSpecialistUrl, useAllOrdersList} from '../../../Hooks/order'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {resetOrderCartList} from '../../../Models/order-model'
import {INFO_MAT} from '../../../Constants/app'
import {AccountSpecialists, TotalCost, UnregisteredOfferings} from '../organisms'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Col, Row} from 'antd'
import {RootContent} from '../../../UIComponents/GlobalStyles'

export const UnregisteredAccountPage = () => {
    useAllOrdersList()
    const {push} = useHistory()
    const {organization} = useParams()
    const {$device, $app: {saveURL}} = useStore($appModel)
    const {currentOrg} = useAddSpecialistUrl()
    
    const goBack = () => {
        push({pathname: saveURL ? saveURL : `/${organization}/offerings`})
        resetOrderCartList()
    }
    
    return (
        <RootContent paddingTop={62} paddingBottom={65}>
            <FixedHeader
                goBack={goBack}
                title={currentOrg?.seller?.name}
            />
            <Row className='container' gutter={[0, 12]}>
                <Col span={24}>
                    <AccountSpecialists/>
                </Col>
                <Col span={24}>
                    <UnregisteredOfferings/>
                </Col>
            </Row>
            {$device && $device !== INFO_MAT && <TotalCost/>}
        </RootContent>
    )
}
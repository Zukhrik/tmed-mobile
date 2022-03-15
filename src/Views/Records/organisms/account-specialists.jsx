import React, {useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useUrlParams} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../../Constants'
import {$orderModel} from '../../../Models/order-model'
import {AccountSpecialistsWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {ChooseSpecialist} from './choose-specialist'

export const AccountSpecialists = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {$orderCartList: {data}} = useStore($orderModel)
    const currentOrg = data.find(item => item.seller.slug_name === organization)
    const specList = currentOrg ? currentOrg.seller.specialists : []
    
    useEffect(() => {
        if (!specId && specList.length > 0) {
            push({
                pathname: `/records/unregistered/${organization}`,
                search: `${URL_KEYS.SPECIALIST_ID}=${specList[0].id}`
            })
        }
    }, [specList, specId, push, organization])
    
    return (
        <AccountSpecialistsWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <Text>{t('choose_specialist')}</Text>
                </Col>
                {
                    specList &&
                    <Col span={24}>
                        <ChooseSpecialist/>
                    </Col>
                }
            </Row>
        </AccountSpecialistsWrapper>
    )
}
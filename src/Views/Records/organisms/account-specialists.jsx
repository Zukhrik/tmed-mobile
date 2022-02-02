import React, {useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useUrlParams} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {URL_KEYS} from '../../../Constants'
import {$orderModel} from '../../../Models/order-model'
import {AccountSpecialistsWrapper, ServeSpecWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {INFO_MAT} from '../../../Constants/app'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {ChooseSpecialist} from './choose-specialist'

export const AccountSpecialists = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {$orderCartList: {data}} = useStore($orderModel)
    const {$orderCartList: {forceLoading}} = useStore($orderModel)
    const currentOrg = data.find(item => item.seller.slug_name === organization)
    const specList = currentOrg ? currentOrg.seller.specialists : []
    const currentSpecInfo = specList.find(item => item.id.toString() === urlData.specialist_id)
    
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
                {
                    $device && $device === INFO_MAT
                        ? ''
                        : (
                            <>
                                <Col span={24}>
                                    <Text>{t('will_serve_you')}</Text>
                                </Col>
                                <Col span={24}>
                                    {
                                        forceLoading === 2
                                            ? <ServeSpecWrapper>
                                                {
                                                    currentSpecInfo &&
                                                    <ShortCard
                                                        imgSize={40}
                                                        imgUrl={currentSpecInfo.user.avatar}
                                                        name={currentSpecInfo.user.full_name}
                                                        text={currentSpecInfo.job.name}
                                                    />
                                                }
                                            </ServeSpecWrapper>
                                            : <ShortCardSkeleton
                                                size={40}
                                                height={40}
                                            />
                                    }
                                </Col>
                            </>
                        )
                }
            </Row>
        </AccountSpecialistsWrapper>
    )
}
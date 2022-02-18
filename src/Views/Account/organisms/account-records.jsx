import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useGoBack} from '../../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {useOrderList} from '../../../Hooks/org'
import {useHistory, useParams} from 'react-router-dom'
import {$orderModel} from '../../../Models/order-model'
import {FixedHeader} from '../../../Components/FixedHeader'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {AccountRecordsCard} from '../molecules/account-records-card'
import moment from 'moment'
import {AccountRecordCardSkeleton} from '../molecules'

const skeleton = generateSkeleton(10)
export const AccountRecords = () => {
    useOrderList(5)
    const {push} = useHistory()
    const {t} = useTranslation()
    const {username} = useParams()
    const {$orderList: {data, forceLoading}} = useStore($orderModel)
    const {goBack} = useGoBack({pathname: `/@${username}`})
    
    const handlePush = (item) => {
        const responsible = item.responsible.id
        const status = item.status
        
        if (responsible && status === 5) {
            push(`/@${username}/records/${item.id}`)
        }
    }
    
    return (
        <RootContent
            height='100vh'
            paddingTop={62}
        >
            <FixedHeader
                goBack={goBack}
                title={t('records')}
            />
            <Row gutter={[0, 12]} className='container' style={{paddingBottom: 65}}>
                {
                    forceLoading === 2 && data
                        ? (
                            <>
                                {
                                    data.map((item, idx) => (
                                        <Col
                                            span={24}
                                            key={`${idx + 1}`}
                                        >
                                            <AccountRecordsCard
                                                meetTime={moment(item.meet_date).calendar()}
                                                imgUrl={item.responsible.org.logo}
                                                orgName={item.responsible.org.name}
                                                orgCat={item.responsible.user.main_cat.name}
                                                handlePush={() => handlePush(item)}
                                            />
                                        </Col>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    skeleton.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <AccountRecordCardSkeleton/>
                                        </Col>
                                    ))
                                }
                            </>
                        )
                }
            </Row>
        </RootContent>
    )
}
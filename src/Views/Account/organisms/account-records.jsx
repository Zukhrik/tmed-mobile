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
import {QRCodeCartCard} from '../../../Components/Cards/QRCodeCartCard'
import {EmptyOrderContainer} from '../../Records/organisms'
import {QRCodeCartCardSkeleton} from '../../../Components/Cards'
import {generateSkeleton} from '../../../utils/skeleton-utils'

const skeleton = generateSkeleton(10)
export const AccountRecords = () => {
    useOrderList(5)
    const {push} = useHistory()
    const {t} = useTranslation()
    const {username} = useParams()
    const {$orderList: {data, forceLoading, result}} = useStore($orderModel)
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
            paddingBottom={65}
        >
            <FixedHeader
                goBack={goBack}
                title={t('records')}
            />
            <Row gutter={[0, 12]} className='container'>
                {
                    forceLoading === 2
                        ? <>
                            {
                                data && data.length > 0
                                    ? (
                                        <>
                                            {
                                                data.map((item, idx) => (
                                                    <Col
                                                        span={24}
                                                        key={`${idx + 1}`}
                                                    >
                                                        <QRCodeCartCard
                                                            src={item.responsible.org.logo}
                                                            time={item.meet_date}
                                                            cost={item.total_cost}
                                                            url={() => handlePush(item)}
                                                            count={result && result.count}
                                                            title={item.responsible.org.name}
                                                            text={item.responsible.org.category.name}
                                                            specialistImg={item.responsible.user.avatar}
                                                            specialistName={item.responsible.user.full_name}
                                                            specialistCat={item.responsible.user.main_cat.name}
                                                        />
                                                    </Col>
                                                ))
                                            }
                                        </>
                                    ) : (
                                        <EmptyOrderContainer/>
                                    )
                            }
                        </>
                        : <>
                            {
                                skeleton.map((item, idx) => (
                                    <Col span={24} key={`${idx + 1}`}>
                                        <QRCodeCartCardSkeleton/>
                                    </Col>
                                ))
                            }
                        </>
                }
            </Row>
        </RootContent>
    )
}
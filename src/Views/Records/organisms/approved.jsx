import React from 'react'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useOrderList} from '../../../Hooks/order'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../Models/order-model'
import {saveURLMount} from '../../../Models/app'
import {Col, Row} from 'antd'
import {QRCodeCartCard} from '../../../Components/Cards/QRCodeCartCard'
import {QRCodeCartCardSkeleton} from '../../../Components/Cards'
import {EmptyOrderContainer} from './empty-order-container'


const skeleton = generateSkeleton(5)
export const Approved = () => {
    useOrderList(1)
    const {push, location: {pathname}} = useHistory()
    const {$orderList: {data, forceLoading}} = useStore($orderModel)
    
    const handlePush = (item) => {
        push(`/records/detail/${item.id}`)
        saveURLMount(pathname)
    }
    
    return (
        <Row gutter={[0, 12]} style={{paddingBottom: 65}}>
            {
                forceLoading === 2
                    ? (
                        <>
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
                    ) : (
                        <>
                            {
                                skeleton.map((item, idx) => (
                                    <Col span={24} key={`${idx + 1}`}>
                                        <QRCodeCartCardSkeleton/>
                                    </Col>
                                ))
                            }
                        </>
                    )
            }
        </Row>
    )
}
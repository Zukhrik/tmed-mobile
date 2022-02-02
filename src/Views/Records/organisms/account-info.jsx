import React from 'react'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../Models/order-model'
import {AccountScrollWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {OrderCardSkeleton, OrderCartCard} from '../../../Components/Cards'

const skeleton = generateSkeleton(10)
export const AccountInfo = ({currentOrg, otherOrgs}) => {
    const {$orderCartList: {forceLoading}} = useStore($orderModel)
    
    return (
        <AccountScrollWrapper>
            <Row wrap={false} gutter={[12, 0]}>
                {
                    currentOrg &&
                    <Col span={24}>
                        <OrderCartCard
                            cost={currentOrg.total.cost}
                            name={currentOrg.seller.name}
                            count={currentOrg.total.count}
                            imgUrl={currentOrg.seller.logo}
                            category={currentOrg.seller.category.name}
                            background='var(--basic-active-background)'
                        />
                    </Col>
                }
                {
                    forceLoading === 2
                        ? (
                            otherOrgs && otherOrgs.map((item, idx) => (
                                <Col
                                    span={24}
                                    key={`${idx + 1}`}
                                >
                                    <OrderCartCard
                                        name={item.seller.name}
                                        count={item.total.count}
                                        imgUrl={item.seller.logo}
                                        category={item.seller.category.name}
                                        containerPath={`/records/unregistered/${item.seller.slug_name}`}
                                    />
                                </Col>
                            ))
                        ) : <>
                            {
                                skeleton.map((item, idx) => (
                                    <Col
                                        span={24}
                                        key={`${idx + 1}`}
                                    >
                                        <OrderCardSkeleton/>
                                    </Col>
                                ))
                            }
                        </>
                }
            </Row>
        </AccountScrollWrapper>
    )
}
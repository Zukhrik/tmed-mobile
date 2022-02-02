import React, {useEffect} from 'react'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useAllOrdersList} from '../../../Hooks/order'
import {useStore} from 'effector-react'
import {$appModel, saveURLMount} from '../../../Models/app'
import {useHistory} from 'react-router-dom'
import {$orderModel} from '../../../Models/order-model'
import {Col, Row} from 'antd'
import {OrderCardSkeleton, OrderCartCard} from '../../../Components/Cards'


const skeleton = generateSkeleton(10)
export const Unregistered = () => {
    useAllOrdersList()
    const {$app: {saveURL}} = useStore($appModel)
    const {push, location: {pathname}} = useHistory()
    const {$orderCartList: {data, forceLoading}} = useStore($orderModel)
    
    const handlePushToItem = (item) => {
        if (item.seller_type === 'user') {
            saveURLMount(pathname) && push(`/records/unregistered/@${item.seller.slug_name}`)
        } else {
            saveURLMount(pathname) && push(`/records/unregistered/${item.seller.slug_name}`)
        }
    }
    
    useEffect(() => {
        if (saveURL === '/records/unregistered') {
            saveURLMount('')
        }
    }, [pathname, saveURL])
    
    return (
        <Row gutter={[0, 12]}>
            {
                forceLoading === 2
                    ? (
                        data && data.length > 0 && data.map((item, idx) => (
                                <Col
                                    span={24}
                                    key={`${idx + 1}`}
                                    onClick={() => handlePushToItem(item)}
                                >
                                    
                                    <OrderCartCard
                                        cost={item.total.cost}
                                        name={item.seller.name}
                                        count={item.total.count}
                                        imgUrl={item.seller.logo}
                                        category={item.seller.category.name}
                                    />
                                </Col>
                            )
                        ))
                    : <>
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
    )
}
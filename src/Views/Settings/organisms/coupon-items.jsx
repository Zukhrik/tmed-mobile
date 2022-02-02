import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {Coupon} from '../../../Components/Cards/Coupon'
import {$accountModel} from '../../../Models/account-model'

export const CouponItems = () => {
    const {$accountCoupons: {data}} = useStore($accountModel)
    
    const handleClick = (item) => {
        console.log(item)
    }
    
    return (
        <Row>
            {
                data?.map((item, idx) => (
                    <Col
                        span={24}
                        key={`${idx + 1}`}
                    >
                        <Coupon
                            color={item.background_color}
                            title={item.title}
                            percent={item.offerings_discount}
                            fromDate={item.from_date}
                            toDate={item.to_date}
                            handleClick={() => handleClick(item)}
                        />
                    </Col>
                ))
            }
        </Row>
    )
}
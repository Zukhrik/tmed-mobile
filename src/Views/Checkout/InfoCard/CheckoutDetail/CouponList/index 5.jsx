import React from 'react'
import {FixedHeader} from '../../../../../Components/FixedHeader'
import {useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {RootContent} from '../../../../../UIComponents/GlobalStyles'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../../../Models/order-model'
import {useParams} from 'react-router-dom'
import {CouponCardItem} from '../../../../../Components/Cards/Coupon/molecules'

export const CouponList = ({goBack, handleClick}) => {
    const {organization} = useParams()
    const {t} = useTranslation()
    const {$orgOrderCartList: {result}} = useStore($orderModel)
    
    return (
        <RootContent
            paddingTop={62}
            height='100vh'
        >
            <FixedHeader
                title={t('coupon_discount')}
                goBack={goBack}
            />
            <Row gutter={[0, 12]} className='container'>
                {
                    result && organization && result[organization].coupons.length > 0
                        ? (
                            <>
                                {
                                    result[organization].coupons.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <CouponCardItem
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
                            </>
                        ) : (
                            <> you have no coupons in this organization</>
                        )
                }
            </Row>
        </RootContent>
    )
}
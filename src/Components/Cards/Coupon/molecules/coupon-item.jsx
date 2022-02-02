import React from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {CouponCardItemWrapper} from '../atoms'
import {CouponSvg} from '../../../../Icons/Coupon'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Title} from '../../../../UIComponents/Typography/Title'


export const CouponCardItem = ({color, title, percent, fromDate, toDate, handleClick}) => {
    
    return (
        <CouponCardItemWrapper
            onClick={handleClick}
            color={color}
        >
            <CouponSvg/>
            <Row className='coupon-info-wrapper'>
                <Col span={24} className='title'>
                    <Text alignType='center'>{title}</Text>
                </Col>
                <Col span={24}>
                    <Title alignType='center'>{`${percent}% OFF`}</Title>
                </Col>
                <Col span={24}>
                    <Text alignType='center'>
                        {`${moment(fromDate).format('D MMM YYYY')} - ${moment(toDate).format('D MMM YYYY')}`}
                    </Text>
                </Col>
            </Row>
        </CouponCardItemWrapper>
    )
}
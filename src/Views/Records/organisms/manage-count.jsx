import React from 'react'
import {useManageCount} from '../../../Hooks/order/use-manage-count'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {ManageButton, ManageCountInput, ManageCountWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {INFO_MAT} from '../../../Constants/app'
import {MinusSvg, PlusSvg} from '../../../Icons/Plus'

export const ManageCount = ({countValue, item}) => {
    const {handleBlur, handleIncrement, handleDecrement, handleChange, values} = useManageCount()
    const offering = item.offering
    const {$device} = useStore($appModel)
    const qty = item.qty
    
    return (
        <ManageCountWrapper>
            <Row wrap={false} gutter={[2, 0]}>
                <Col>
                    <ManageButton
                        height={$device && $device === INFO_MAT ? '50px' : ''}
                        width={$device && $device === INFO_MAT ? '50px' : ''}
                        onClick={() => handleDecrement(item)}
                        disabled={item.offering.min_qty === item.qty}
                    >
                        <MinusSvg/>
                    </ManageButton>
                </Col>
                <Col>
                    <ManageCountInput
                        disabled
                        type='number'
                        pattern='[0-9]*'
                        placeholder={`${countValue}`}
                        onBlur={() => handleBlur(offering, qty)}
                        fontSize={$device && $device === INFO_MAT ? '18px' : ''}
                        height={$device && $device === INFO_MAT ? '50px' : ''}
                        value={values[offering.id] !== undefined ? values[offering.id] : qty}
                        onChange={(e) => handleChange(e.target.value, {offering, qty})}
                    />
                </Col>
                <Col>
                    <ManageButton
                        height={$device && $device === INFO_MAT ? '50px' : ''}
                        width={$device && $device === INFO_MAT ? '50px' : ''}
                        onClick={() => handleIncrement(item)}
                        disabled={item.qty === item.offering.qty}
                    >
                        <PlusSvg/>
                    </ManageButton>
                </Col>
            </Row>
        </ManageCountWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {OfferingInfo} from './offering-info'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {ProductInfoContentWrapper} from '../atoms'
import {OfferSpecialists} from './offering-specialists'
import {OfferingCharacteristics} from './offering-characteristics'
import {OfferingDescription} from './offering-description'

export const PageBody = () => {
    const {$device} = useStore($appModel)
    
    return (
        <ProductInfoContentWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <OfferingInfo/>
                </Col>
                <Col span={24}>
                    {$device && $device !== INFO_MAT && <OfferSpecialists/>}
                </Col>
                <Col span={24}>
                    <OfferingDescription/>
                </Col>
                <Col span={24}>
                    <OfferingCharacteristics/>
                </Col>
            </Row>
        </ProductInfoContentWrapper>
    )
}
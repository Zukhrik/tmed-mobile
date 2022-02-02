import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {Container} from '../../GlobalStyles'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {FixedHeader} from '../../../Components/FixedHeader'
import {CheckoutPageWireframeWrapper, LinkWrapper} from './style'
import {FixedHeaderComponent} from '../../../Components/FixedHeader/FixedHeaderComponent'

export const CheckoutPageWireframe = (
    {
        link,
        title,
        title1,
        nextTo,
        title3,
        goBack,
        payment,
        infoCard,
        disabled
    }
) => {
    const {$device} = useStore($appModel)
    
    return (
        <CheckoutPageWireframeWrapper>
            {
                $device && $device === INFO_MAT
                    ? <FixedHeader
                        goBack={goBack}
                        component={
                            <FixedHeaderComponent
                                title1={title1}
                                goBack={goBack}
                                nextTo={nextTo}
                                title3={title3}
                                disabled={disabled}
                            />
                        }
                    />
                    : <FixedHeader
                        goBack={goBack}
                        title={title}
                    />
            }
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <Container>
                        {infoCard}
                    </Container>
                </Col>
                <Col span={24}>
                    <Container>
                        {payment}
                    </Container>
                </Col>
            </Row>
            <LinkWrapper>
                {link}
            </LinkWrapper>
        </CheckoutPageWireframeWrapper>
    )
}
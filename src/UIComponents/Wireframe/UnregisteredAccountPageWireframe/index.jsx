import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {FixedHeader} from '../../../Components/FixedHeader'
import {UnregisteredAccountPageWireframeWrapper} from './style'
import {FixedHeaderComponent} from '../../../Components/FixedHeader/FixedHeaderComponent'

export const UnregisteredAccountPageWireframe = (
    {
        title,
        goBack,
        header,
        title1,
        title3,
        nextTo,
        specCard,
        offerings
    }
) => {
    const {$device} = useStore($appModel)
    
    return (
        <UnregisteredAccountPageWireframeWrapper
            padding={$device && $device === INFO_MAT ? '100px 0 60px 0' : ''}
        >
            {
                $device && $device === INFO_MAT
                    ? <FixedHeader
                        goBack={goBack}
                        component={
                            <FixedHeaderComponent
                                goBack={goBack}
                                title1={title1}
                                title3={title3}
                                nextTo={nextTo}
                            />
                        }
                    />
                    : <FixedHeader
                        goBack={goBack}
                        title={title}
                    />
            }
            <Row gutter={[0, 12]}>
                {
                    header && (
                        <Col span={24} className='container'>
                            {header}
                        </Col>
                    )
                }
                {
                    specCard &&
                    <Col span={24} className='container'>
                        {specCard}
                    </Col>
                }
                <Col span={24} className='container'>
                    {offerings}
                </Col>
            </Row>
        </UnregisteredAccountPageWireframeWrapper>
    )
}
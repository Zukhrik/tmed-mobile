import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {OfferingPageWrapper} from '../atoms'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {FixedHeader} from '../../../Components/FixedHeader'
import {FixedHeaderComponent} from '../../../Components/FixedHeader/FixedHeaderComponent'


export const OfferingPageWireframe = ({header, content, goBack, title, title3, nextTo}) => {
    const {$device} = useStore($appModel)
    
    return (
        <OfferingPageWrapper
            paddingTop={$device && $device === INFO_MAT ? '80px' : ''}
        >
            {
                $device && $device === INFO_MAT
                    ? <FixedHeader
                        component={
                            <FixedHeaderComponent
                                goBack={goBack}
                                title1={title}
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
                <Col span={24} className='media-wrapper'>
                    {header}
                </Col>
                <Col span={24} style={{position: 'relative'}}>
                    {content}
                </Col>
            </Row>
        </OfferingPageWrapper>
    )
}
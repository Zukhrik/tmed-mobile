import React from 'react'
import {Col, Row} from 'antd'
import {DWEDSvg} from '../../../Icons/DWED'
import {PlusSquareSvg} from '../../../Icons/Plus'
import {TapeFixedHeaderWrapper} from '../atoms'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'

export const TapeFixedHeader = ({setCreatePost}) => {
    const {$app: {token}} = useStore($appModel)
    
    return (
        <TapeFixedHeaderWrapper>
            <Row
                wrap={false}
                align='middle'
                justify='space-between'
            >
                <Col className='logo-wrapper'>
                    <DWEDSvg/>
                </Col>
                {
                    !!token && (
                        <Col
                            className='create-post-wrapper'
                            onClick={() => setCreatePost(true)}
                        >
                            <PlusSquareSvg/>
                        </Col>
                    )
                }
            </Row>
        </TapeFixedHeaderWrapper>
    )
}
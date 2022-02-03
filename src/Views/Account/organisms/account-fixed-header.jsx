import React from 'react'
import {Col, Row} from 'antd'
import {LogoSvg} from '../../../Icons/Logo'
import {LogoutSvg} from '../../../Icons/Logout'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'

export const AccountFixedHeader = ({logoClick, logOutClick}) => {
    const {$app: {token}} = useStore($appModel)
    
    return (
        <Row wrap={false} justify='space-between' align='middle'>
            <Col onClick={logoClick}>
                <LogoSvg/>
            </Col>
            {
                !!token && (
                    <Col onClick={logOutClick}>
                        <LogoutSvg/>
                    </Col>
                )
            }
        </Row>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {LogoSvg} from '../../../Icons/Logo'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {LogoutSvg} from '../../../Icons/Logout'

export const UserFixedHeaderComponent = ({logoClick, logoutClick}) => {
    const {$app: {token}} = useStore($appModel)
    
    return (
        <Row justify='space-between' wrap={false} align='middle'>
            <Col onClick={logoClick}>
                <LogoSvg/>
            </Col>
            {
                !!token && (
                    <Col onClick={logoutClick}>
                        <LogoutSvg/>
                    </Col>
                )
            }
        </Row>
    )
}
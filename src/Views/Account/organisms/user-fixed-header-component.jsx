import React from 'react'
import {Col, Row} from 'antd'
import {LogoSvg} from '../../../Icons/Logo'
import {OfferingSvg} from '../../../Icons/Offering'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {useParams} from 'react-router-dom'

export const UserFixedHeaderComponent = ({logoClick, cartClick}) => {
    const {username} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <Row justify='space-between' wrap={false} align='middle'>
            <Col onClick={logoClick}>
                <LogoSvg/>
            </Col>
            {
                currentProfile && currentProfile.slug_name === username && (
                    <Col onClick={cartClick}>
                        <OfferingSvg/>
                    </Col>
                )
            }
        </Row>
    )
}
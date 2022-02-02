import React from 'react'
import {Col, Row} from 'antd'
import {IconBox} from '../../../GlobalStyles'
import {AccountFixedHeaderWrapper} from '../style'

export const AccountFixedHeaderComponent = ({logo, cart, menu, logoClick, cartClick, menuClick, title, create, handleCreate}) => {
    return (
        <AccountFixedHeaderWrapper>
            <Row gutter={[12, 0]} align='middle' justify='space-between'>
                <Col>
                    <IconBox onClick={logoClick} color='var(--primary-dwed)'>
                        {logo}
                    </IconBox>
                </Col>
                {
                    title && (
                        <Col flex={1}>
                            {title}
                        </Col>
                    )
                }
                <Col>
                    <Row gutter={[24, 0]} className='icons-wrapper'>
                        <Col onClick={handleCreate}>
                            {create}
                        </Col>
                        <Col onClick={cartClick}>
                            {cart}
                        </Col>
                        <Col onClick={menuClick}>
                            {menu}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AccountFixedHeaderWrapper>
    )
}
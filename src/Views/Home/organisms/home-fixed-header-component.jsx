import React from 'react'
import {Col, Row} from 'antd'
import {LogoSvg} from '../../../Icons/Logo'
import {HomeFixedHeaderComponentWrapper} from '../atoms'
import {OrgsSearchInput} from '../molecules'

export const HomeFixedHeaderComponent = () => {
    return (
        <HomeFixedHeaderComponentWrapper>
            <Row justify='space-between' wrap={false}>
                <Col>
                    <LogoSvg/>
                </Col>
                <Col className='search-icon-wrapper'>
                    <OrgsSearchInput/>
                </Col>
            </Row>
        </HomeFixedHeaderComponentWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {SearchSvg} from '../../../Icons/Search'
import {LogoSvg} from '../../../Icons/Logo'
import {HomeFixedHeaderComponentWrapper} from '../atoms'

export const HomeFixedHeaderComponent = ({searchClick}) => {
    return (
        <HomeFixedHeaderComponentWrapper>
            <Row justify='space-between' wrap={false}>
                <Col>
                    <LogoSvg/>
                </Col>
                <Col className='search-icon-wrapper' onClick={searchClick}>
                    <SearchSvg/>
                </Col>
            </Row>
        </HomeFixedHeaderComponentWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {LogoSvg} from '../../../Icons/Logo'
import {HomeFixedHeaderComponentWrapper} from '../atoms'
import {SearchSvg} from '../../../Icons/Search'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const HomeFixedHeaderComponent = ({setModal}) => {
    return (
        <HomeFixedHeaderComponentWrapper>
            <Row justify='space-between' wrap={false}>
                <Col>
                    <IconBox>
                        <LogoSvg/>
                    </IconBox>
                </Col>
                <Col className='search-icon-wrapper'
                     onClick={() => setModal(true)}
                >
                    <SearchSvg/>
                </Col>
            </Row>
        </HomeFixedHeaderComponentWrapper>
    )
}
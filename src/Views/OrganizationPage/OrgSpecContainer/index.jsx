import React from 'react'
import {Col, Row} from 'antd'
import {Container} from '../../../UIComponents/GlobalStyles'
import {OrgSpecCatList, OrgSpecialistList} from '../../../Components/Offering/OrgOfferings'

export const OrgSpecContainer = () => {
    
    return (
        <Row>
            <Container>
                <Col span={24}>
                    <OrgSpecCatList/>
                </Col>
                <Col span={24}>
                    <OrgSpecialistList/>
                </Col>
            </Container>
        </Row>
    )
}
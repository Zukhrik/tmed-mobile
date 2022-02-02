import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../Typography/Text'
import {useLocation, useParams} from 'react-router-dom'
import {OrgSpecialistList} from '../../../../Components/Offering/OrgOfferings'
import {NoOfferingSvg} from '../../../../Icons/NoOffering'
import {EmptyContainerWrapper} from '../../../GlobalStyles'

export const InfoMatViewWireframe = (
    {
        pushLink,
        pageHeader,
        filterPanel,
        pageContent,
        offeringGroup,
    }
) => {
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const {organization, username} = useParams()
    
    
    const fixedHeaderStyle = {
        top: 0,
        zIndex: 100,
        position: 'fixed',
        paddingBottom: 20,
        backgroundColor: 'var(--default-white)'
    }
    
    const offeringPositionStyle = {
        position: 'relative',
        top: 700
    }
    
    
    return (
        <Row gutter={[0, 20]}>
            <Col span={24} style={fixedHeaderStyle}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        {pageHeader}
                    </Col>
                    {
                        filterPanel && (
                            <Col span={24}>
                                {filterPanel}
                            </Col>
                        )
                    }
                    <Col span={24}>
                        {pushLink}
                    </Col>
                    {
                        pathname === `/${organization || username}/offerings`
                            ? <Col span={24} className='container'>
                                <Text className='cat-name-style'>{t('specialists')}</Text>
                                <OrgSpecialistList/>
                            </Col>
                            : ''
                    }
                    {
                        offeringGroup &&
                        <Col span={24}>
                            {offeringGroup}
                        </Col>
                    }
                </Row>
            </Col>
            <Col span={24} style={organization && offeringPositionStyle}>
                {
                    organization
                        ? pageContent
                        : <EmptyContainerWrapper style={{paddingTop: 243}}>
                            <NoOfferingSvg/>
                        </EmptyContainerWrapper>
                }
            </Col>
        </Row>
    )
}
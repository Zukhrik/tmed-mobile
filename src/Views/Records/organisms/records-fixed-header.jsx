import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {RecordsFixedHeaderComponentWrapper, RecordsNavLink} from '../atoms'

export const RecordsFixedHeader = ({goBack}) => {
    const {t} = useTranslation()
    
    return (
        <RecordsFixedHeaderComponentWrapper>
            <Row>
                <Col span={24} className='header'>
                    <IconBox onClick={goBack}>
                        <ArrowLeftSvg/>
                    </IconBox>
                    <Title onClick={goBack}>{t('records')}</Title>
                </Col>
                <Col span={24} style={{height: 32}}>
                    <Row wrap={false} justify='space-around' align='middle'>
                        <Col>
                            <RecordsNavLink
                                to={'/records/my_orders'}
                            >
                                {t('my_orders')}
                            </RecordsNavLink>
                        </Col>
                        <Col>
                            <RecordsNavLink
                                to={'/records/my_records'}
                            >
                                {t('my_records')}
                            </RecordsNavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </RecordsFixedHeaderComponentWrapper>
    )
}
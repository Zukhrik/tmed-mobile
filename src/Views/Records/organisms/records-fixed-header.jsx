import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {recordMainListData} from '../../../data'
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
                <Col span={24} className='scroll-width-wrapper'>
                    {
                        recordMainListData.map((item, idx) => (
                            <RecordsNavLink
                                key={`${idx + 1}`}
                                to={`/records/${item.id}`}
                            >
                                {t(item.id)}
                            </RecordsNavLink>
                        ))
                    }
                </Col>
            </Row>
        </RecordsFixedHeaderComponentWrapper>
    )
}
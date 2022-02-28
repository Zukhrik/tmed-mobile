import {Col, Row} from 'antd'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {OrgSearchInputWrapper} from '../atoms'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {CloseMiniSvg} from '../../../Icons/Close'
import {AllScreenModal, EmptyContainerWrapper} from '../../../UIComponents/GlobalStyles'
import {ShortCard} from '../../../Components/Cards'
import {NoSearchResultSvg} from '../../../Icons/NoSearchResult'
import {Title} from '../../../UIComponents/Typography/Title'

export const OrgsSearchInput = ({onCancel, visible, setModal, handleSubmit, orgSearch, setOrgSearch, orgList}) => {
    const {t} = useTranslation()
    
    
    return (
        <AllScreenModal
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={visible}
            destroyOnClose
        >
            <OrgSearchInputWrapper onSubmit={(e) => handleSubmit(e)}>
                <Row
                    wrap={false}
                    align='middle'
                    gutter={[12, 0]}
                    justify='space-between'
                    className='fixed-header'
                >
                    <Col className='icon' onClick={onCancel}>
                        <ArrowLeftSvg/>
                    </Col>
                    <Col flex={1}>
                        <input
                            value={orgSearch}
                            onChange={(e) => setOrgSearch(e.target.value)}
                            placeholder={t('search')}
                        />
                    </Col>
                    <Col className='icon' onClick={() => setOrgSearch('')}>
                        <CloseMiniSvg/>
                    </Col>
                </Row>
                {
                    orgList && orgList.length > 0
                        ? (
                            <Row gutter={[0, 12]} className='org-list'>
                                {
                                    orgList.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <ShortCard
                                                containerPath={`/${item.slug_name}/offerings`}
                                                imgSize={50}
                                                imgUrl={item.logo}
                                                name={item.name}
                                                text={item.category.name}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        ) : (
                            <EmptyContainerWrapper>
                                <NoSearchResultSvg/>
                                <Title level={4}>{t('no_search_result')}</Title>
                            </EmptyContainerWrapper>
                        )
                }
            </OrgSearchInputWrapper>
        </AllScreenModal>
    )
}
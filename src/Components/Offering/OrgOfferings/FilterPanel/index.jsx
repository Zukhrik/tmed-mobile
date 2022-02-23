import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {INFO_MAT} from '../../../../Constants/app'
import {useUrlParams} from '../../../../Hooks/app'
import {SearchSvg} from '../../../../Icons/Search'
import {CategorySvg} from '../../../../Icons/Category'
import {useOrgOfferSearch} from '../../../../Hooks/org'
import {IconBox} from '../../../../UIComponents/GlobalStyles'
import {FilterPanelWrapper, FilterSearchPanel, SearchPanelForm} from '../style'
import {$appModel, switchOrgGroupPanel} from '../../../../Models/app'

export const FilterPanel = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {$app: {changeOrgGroupPanel}, $device} = useStore($appModel)
    const {searchText, setSearchText, handleSubmit} = useOrgOfferSearch()
    
    return (
        <FilterPanelWrapper>
            <Row justify='space-between' wrap={false}>
                <Col
                    span={$device && $device === INFO_MAT ? 24 : 14}
                >
                    <SearchPanelForm onSubmit={handleSubmit}>
                        <FilterSearchPanel
                            type='search'
                            value={searchText}
                            placeholder={`${t('search')}...`}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <IconBox onClick={handleSubmit}>
                            <SearchSvg/>
                        </IconBox>
                    </SearchPanelForm>
                </Col>
                {
                    $device && $device !== INFO_MAT && (
                        <Col>
                            <IconBox
                                onClick={() => switchOrgGroupPanel(!changeOrgGroupPanel)}
                                color={
                                    (changeOrgGroupPanel || urlData.specialist_category_id || urlData.specialist_id)
                                        ? 'var(--primary-dwed)'
                                        : 'var(--grey-dwed)'
                                }
                            >
                                <CategorySvg/>
                            </IconBox>
                        </Col>
                    )
                }
                {/*{*/}
                {/*    $device && $device !== INFO_MAT && (*/}
                {/*        <Col>*/}
                {/*            <IconBox*/}
                {/*                onClick={() => changeSpecPanel(!showSpecPanel)}*/}
                {/*                color={*/}
                {/*                    (showSpecPanel || urlData.specialist_category_id || urlData.specialist_id)*/}
                {/*                        ? 'var(--primary-dwed)'*/}
                {/*                        : 'var(--grey-dwed)'*/}
                {/*                }*/}
                {/*            >*/}
                {/*                <PeopleSvg/>*/}
                {/*            </IconBox>*/}
                {/*        </Col>*/}
                {/*    )*/}
                {/*}*/}
            </Row>
        </FilterPanelWrapper>
    )
}
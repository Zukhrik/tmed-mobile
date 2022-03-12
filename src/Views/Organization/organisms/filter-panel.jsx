import React from 'react'
import {OverlaySettings} from '../../../Components/Overlay'
import {OverlayOfferingGroup, OverlaySpecialists} from '../../../Components/Offering/OrgOfferings'
import {$appModel, changeSpecPanel, switchOrgGroupPanel} from '../../../Models/app'
import {Col, Row} from 'antd'
import {FilterPanelWrapper, FilterSearchPanel, SearchPanelForm} from '../atoms'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {SearchSvg} from '../../../Icons/Search'
import {URL_KEYS} from '../../../Constants'
import {CategorySvg} from '../../../Icons/Category'
import {PeopleSvg} from '../../../Icons/People'
import {useTranslation} from 'react-i18next'
import {useUrlParams} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {useOrgOfferSearch} from '../../../Hooks/org'

export const FilterPanel = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {$app: {changeOrgGroupPanel, showSpecPanel}} = useStore($appModel)
    const {searchText, handleChange, handleSubmit} = useOrgOfferSearch()
    
    return (
        <FilterPanelWrapper>
            <OverlaySettings
                openSettings={changeOrgGroupPanel}
                content={<OverlayOfferingGroup/>}
                onClose={() => switchOrgGroupPanel(false)}
            />
            <OverlaySettings
                openSettings={showSpecPanel}
                onClose={() => changeSpecPanel(false)}
                content={<OverlaySpecialists/>}
            />
            <Row justify='space-between' wrap={false} align='middle' gutter={[16, 0]}>
                <Col flex={1}>
                    <SearchPanelForm onSubmit={handleSubmit}>
                        <FilterSearchPanel
                            type='search'
                            value={searchText}
                            placeholder={`${t('search')}...`}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <IconBox onClick={handleSubmit}>
                            <SearchSvg/>
                        </IconBox>
                    </SearchPanelForm>
                </Col>
                <Col>
                    <IconBox
                        onClick={() => switchOrgGroupPanel(!changeOrgGroupPanel)}
                        color={
                            (changeOrgGroupPanel || urlData[URL_KEYS.OFFERING_GROUP_ID])
                                ? 'var(--primary-dwed)'
                                : 'var(--grey-dwed)'
                        }
                    >
                        <CategorySvg/>
                    </IconBox>
                </Col>
                <Col>
                    <IconBox
                        onClick={() => changeSpecPanel(!showSpecPanel)}
                        color={
                            (showSpecPanel || urlData[URL_KEYS.SPECIALIST_ID])
                                ? 'var(--primary-dwed)'
                                : 'var(--grey-dwed)'
                        }
                    >
                        <PeopleSvg/>
                    </IconBox>
                </Col>
            </Row>
        </FilterPanelWrapper>
    )
}
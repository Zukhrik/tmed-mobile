import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {searchLink} from '../../../data'
import {URL_KEYS} from '../../../Constants'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {useHomeSearch} from '../../../Hooks/home'
import {scrollTop} from '../../../utils/scroll-top'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {SearchInput, SearchInputForm, SearchNavLink, SearchWrapper} from '../atoms'
import {SearchSvg} from '../../../Icons/Search'


export const Header = ({setOpenSearch}) => {
    const {$device} = useStore($appModel)
    const {getActive} = useHomeSearch()
    const {t} = useTranslation()
    
    // const handleClick = useCallback((item) => {
    //     const url = []
    //
    //     if (!searchType) {
    //         if (item.has_subs) {
    //             url.push(`${URL_KEYS.CATEGORY}=${item.slug}`)
    //         } else {
    //             url.push(`${URL_KEYS.CATEGORY}=${item.slug}`)
    //         }
    //     } else if (searchType === URL_VALUES.OFFERINGS) {
    //         url.push(`${URL_KEYS.SEARCH_TYPE}=${searchType}`)
    //         if (item.has_subs) {
    //             url.push(`${URL_KEYS.CATEGORY}=${item.id}`)
    //         }
    //     }
    //
    //     push({
    //         pathname,
    //         search: url.join('&')
    //     })
    // }, [searchType, push, pathname])
    
    
    return (
        <SearchWrapper>
            <SearchInputForm onClick={() => setOpenSearch(true)}>
                <SearchInput
                    disabled
                    type='search'
                    placeholder={t('what_are_you_looking_for?')}
                />
                <IconBox>
                    <SearchSvg/>
                </IconBox>
            </SearchInputForm>
            {
                $device && $device !== INFO_MAT && (
                    <Row gutter={[12, 0]} justify='space-around'>
                        {
                            searchLink.map((item) => {
                                return (
                                    <Col
                                        key={item.id}
                                        onClick={scrollTop}
                                    >
                                        <SearchNavLink
                                            to={{
                                                pathname: '/search',
                                                search: item.id !== 'organization'
                                                    ? `${URL_KEYS.SEARCH_TYPE}=${item.id}`
                                                    : ''
                                            }}
                                            isActive={() => getActive(item.id)}
                                        >
                                            {t(item.name)}
                                        </SearchNavLink>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            }
            {/*{*/}
            {/*    $device && $device !== INFO_MAT && !searchType*/}
            {/*        ? <OrgCategories*/}
            {/*            openFilter={openFilter}*/}
            {/*            handleClick={handleClick}*/}
            {/*            setOpenFilter={setOpenFilter}*/}
            {/*        />*/}
            {/*        : <OfferingCategories*/}
            {/*            openFilter={openFilter}*/}
            {/*            handleClick={handleClick}*/}
            {/*            setOpenFilter={setOpenFilter}*/}
            {/*        />*/}
            {/*}*/}
        </SearchWrapper>
    )
}
import React, {useCallback, useState} from 'react'
import {OfferGroupWrapper, OfferingGroupSearchForm, SpecialistNavLink} from '../style'
import {SearchSvg} from '../../../../Icons/Search'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$orgModel, orgSpecialistsMount} from '../../../../Models/org-model'
import {OrgSpecialistCard} from '../../../Cards'
import {URL_KEYS} from '../../../../Constants'
import {useOrgSpecialistLists, useUrlGenerate} from '../../../../Hooks/org'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useParams} from 'react-router-dom'

export const OverlaySpecialists = () => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const {loadMore} = useOrgSpecialistLists()
    const {getActive, generateUrl} = useUrlGenerate()
    const [search, setSearch] = useState('')
    const {$orgSpecialistsList: {data, result, loading}} = useStore($orgModel)
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (search.length > 2) {
            const params = {
                clear: true,
                organization,
                params: {
                    search
                }
            }
            orgSpecialistsMount(params)
        }
    }, [search, organization])
    
    return (
        <OfferGroupWrapper id='scrollableSpec'>
            <OfferingGroupSearchForm onSubmit={handleSubmit}>
                <input
                    placeholder={`${t('search')}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SearchSvg/>
            </OfferingGroupSearchForm>
            <InfiniteScroll
                next={loadMore}
                dataLength={result.nextOffset || 20}
                hasMore={!loading && !!result?.next}
                loader={<>...loading</>}
                style={{overflow: 'hidden', padding: '50px 0'}}
                scrollableTarget='scrollableSpec'
            >
                <Row gutter={[12, 12]}>
                    {
                        data && data.map((item, idx) => (
                            <Col
                                className='centered'
                                key={`${idx + 1}`} span={8}
                            >
                                <SpecialistNavLink
                                    key={`${idx + 1}`}
                                    to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                    isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                >
                                    <OrgSpecialistCard
                                        name={item.user.full_name}
                                        src={item.user.avatar}
                                        category={item.job.name}
                                    />
                                </SpecialistNavLink>
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </OfferGroupWrapper>
    )
}
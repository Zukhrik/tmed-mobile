import React, {useCallback, useState} from 'react'
import {OfferGroupWrapper, OfferingGroupSearchForm, SpecialistNavLink} from '../style'
import {SearchSvg} from '../../../../Icons/Search'
import {Col, Row, Spin} from 'antd'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$orgModel, orgSpecialistsMount} from '../../../../Models/org-model'
import {OrgSpecialistCard, OrgSpecialistCardSkeleton} from '../../../Cards'
import {URL_KEYS} from '../../../../Constants'
import {useOrgSpecialistLists, useUrlGenerate} from '../../../../Hooks/org'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useParams} from 'react-router-dom'
import {generateSkeleton} from '../../../../utils/skeleton-utils'

const skeleton = generateSkeleton(9)
export const OverlaySpecialists = () => {
    const {t} = useTranslation()
    const {organization} = useParams()
    const {loadMore} = useOrgSpecialistLists()
    const {getActive, generateUrl} = useUrlGenerate()
    const [search, setSearch] = useState('')
    const {$orgSpecialistsList: {data, result, loading, forceLoading}} = useStore($orgModel)
    
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
    
    const onChange = useCallback((value) => {
        if (value.length === 0) {
            const params = {
                clear: true,
                organization
            }
            orgSpecialistsMount(params)
        }
        setSearch(value)
    }, [organization])
    
    return (
        <OfferGroupWrapper id='scrollableSpec'>
            <OfferingGroupSearchForm onSubmit={handleSubmit}>
                <input
                    placeholder={`${t('search')}...`}
                    value={search}
                    onChange={(e) => onChange(e.target.value)}
                />
                <SearchSvg/>
            </OfferingGroupSearchForm>
            <InfiniteScroll
                next={loadMore}
                dataLength={result.nextOffset || 20}
                hasMore={!loading && !!result?.next}
                loader={<Spin/>}
                style={{overflow: 'hidden', paddingTop: 50, paddingBottom: 12}}
                scrollableTarget='scrollableSpec'
            >
                <Row gutter={[12, 12]}>
                    {
                        data && forceLoading === 2
                            ? (
                                data.map((item, idx) => (
                                    <Col
                                        className='centered'
                                        key={`${idx + 1}`}
                                        xs={8} sm={6} md={4}
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
                            ) : (
                                skeleton.map((ite, idx) => (
                                    <Col key={idx + 1} xs={8} sm={6} md={4}>
                                        <OrgSpecialistCardSkeleton/>
                                    </Col>
                                ))
                            )
                    }
                </Row>
            </InfiniteScroll>
        </OfferGroupWrapper>
    )
}
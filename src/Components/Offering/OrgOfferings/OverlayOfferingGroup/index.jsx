import React, {useCallback, useState} from 'react'
import {OfferGroupWrapper, OfferingGroupSearchForm} from '../style'
import {Col, Row, Spin} from 'antd'
import {useStore} from 'effector-react'
import {OfferingGroupItem} from '../OfferingGroupItem'
import {URL_KEYS} from '../../../../Constants'
import {useUrlParams} from '../../../../Hooks/app'
import {useLocation, useParams} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import {$offeringsModel, orgOfferGroupListMount} from '../../../../Models/offerings-model'
import {SearchSvg} from '../../../../Icons/Search'
import {useTranslation} from 'react-i18next'
import {useOfferingList} from '../../../../Hooks/offerings'
import {generateSkeleton} from '../../../../utils/skeleton-utils'
import {OfferingGroupItemSkeleton} from '../OfferingGroupItemSkeleton'

const skeleton = generateSkeleton(9)
export const OverlayOfferingGroup = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()
    const {organization} = useParams()
    const {loadMoreOfferingGroup} = useOfferingList()
    const [searchText, setSearchText] = useState('')
    const groupId = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const {$offeringGroupList: {data, loading, result, forceLoading}} = useStore($offeringsModel)
    
    const generateUrl = useCallback((id) => {
        const url = []
        if (urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]}`)
        }
        
        if (urlData[URL_KEYS.SPECIALIST_ID]) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${urlData[URL_KEYS.SPECIALIST_ID]}`)
        }
        
        if (!groupId || groupId !== String(id)) {
            url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${id}`)
        }
        
        return {
            pathname,
            search: url.join('&')
        }
    }, [pathname, groupId, urlData])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchText.length > 2) {
            const params = {
                clear: true,
                organization: organization,
                params: {
                    search: searchText
                }
            }
            orgOfferGroupListMount(params)
        }
    }
    
    const onChange = useCallback((value) => {
        if (value.length === 0) {
            const params = {
                clear: true,
                organization
            }
            orgOfferGroupListMount(params)
        }
        setSearchText(value)
    }, [organization])
    
    
    return (
        <OfferGroupWrapper id='scrollableDiv'>
            <OfferingGroupSearchForm onSubmit={handleSubmit}>
                <input
                    placeholder={`${t('search')}...`}
                    value={searchText}
                    onChange={(e) => onChange(e.target.value)}
                />
                <SearchSvg/>
            </OfferingGroupSearchForm>
            <InfiniteScroll
                next={loadMoreOfferingGroup}
                dataLength={result?.nextOffset || 20}
                hasMore={!loading && !!result?.next}
                loader={<Spin/>}
                style={{overflow: 'hidden', paddingTop: 50, paddingBottom: 12}}
                scrollableTarget='scrollableDiv'
            >
                <Row gutter={[12, 12]} align='top'>
                    {
                        data && forceLoading === 2
                            ? (
                                data.map((item, idx) => (
                                    <Col
                                        className='centered'
                                        key={idx + 1} xs={8} sm={6} md={4}
                                    >
                                        <OfferingGroupItem
                                            name={item.name}
                                            imgUrl={item.image}
                                            path={generateUrl(item.id)}
                                            isActive={() => groupId && groupId === String(item.id)}
                                        />
                                    </Col>
                                ))
                            ) : (
                                skeleton.map((item, idx) => (
                                    <Col key={idx + 1} xs={8} sm={6} md={4} className='centered'>
                                        <OfferingGroupItemSkeleton/>
                                    </Col>
                                ))
                            )
                    }
                </Row>
            </InfiniteScroll>
        </OfferGroupWrapper>
    )
}
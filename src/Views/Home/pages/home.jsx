import React, {useCallback, useState} from 'react'
import {EmptyContainerWrapper, RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {HomeFixedHeaderComponent} from '../organisms'
import {useHomeList} from '../../../Hooks/home'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$orgModel} from '../../../Models/org-model'
import {useHistory} from 'react-router-dom'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {OrganizationCard, OrganizationCardSkeleton} from '../../../Components/Cards/OrganizationCard'
import {NoSearchResultSvg} from '../../../Icons/NoSearchResult'
import {Title} from '../../../UIComponents/Typography/Title'
import {useTranslation} from 'react-i18next'
import {OrgsSearchInput} from '../molecules'
import org from '../../../Service/org'

const skeleton = generateSkeleton(10)
export const Home = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {loadMore} = useHomeList()
    const [modal, setModal] = useState(false)
    const [orgList, setOrgList] = useState([])
    const [orgSearch, setOrgSearch] = useState('')
    const {$allOrgList: {data, result, loading, forceLoading}} = useStore($orgModel)
    
    const handleOrgItemClick = (item) => {
        push(`/${item.slug_name}/offerings`)
    }
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (orgSearch.length > 3) {
            const data = {
                clear: true,
                params: {
                    search: orgSearch
                }
            }
            org.getAllOrg(data)
                .then(res => {
                    if (res) {
                        setOrgList(res.data.results)
                    }
                })
        }
    }, [orgSearch])
    
    const onClose = () => {
        setModal(false)
        setOrgList([])
        setOrgSearch('')
    }
    
    return (
        <RootContent paddingTop={62}>
            <OrgsSearchInput
                visible={modal}
                onCancel={onClose}
                setModal={setModal}
                setOrgSearch={setOrgSearch}
                orgSearch={orgSearch}
                handleSubmit={handleSubmit}
                orgList={orgList}
            />
            <FixedHeader component={<HomeFixedHeaderComponent setModal={setModal}/>}/>
            <InfiniteScroll
                next={loadMore}
                hasMore={!loading && !!result.next}
                dataLength={result.nextOffset || 10}
                loader={<>...loading</>}
            >
                {
                    forceLoading === 2 && data
                        ? (
                            <>
                                {
                                    data.length > 0
                                        ? (
                                            <Row className='container' gutter={[0, 12]}>
                                                {
                                                    data.map((item, idx) => (
                                                        <Col span={24} key={`${idx + 1}`}>
                                                            <OrganizationCard
                                                                name={item.name}
                                                                imgUrl={item.logo}
                                                                containerPath={() => handleOrgItemClick(item)}
                                                                category={item.category.name}
                                                                ethics={item.rating.ethics.level}
                                                                aesthetics={item.rating.aesthetics.level}
                                                                professional={item.rating.professional.level}
                                                            />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        ) : (
                                            <EmptyContainerWrapper style={{height: '80vh'}}>
                                                <NoSearchResultSvg/>
                                                <Title level={4}>{t('no_search_result')}</Title>
                                            </EmptyContainerWrapper>
                                        )
                                }
                            </>
                        )
                        : (
                            <Row className='container' gutter={[0, 12]}>
                                {
                                    skeleton.map((item, idx) => (
                                        <Col span={24} key={`${idx + 1}`}>
                                            <OrganizationCardSkeleton/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        )
                }
            </InfiniteScroll>
        
        </RootContent>
    )
}
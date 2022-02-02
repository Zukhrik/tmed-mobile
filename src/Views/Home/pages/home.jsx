import React from 'react'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {HomeFixedHeaderComponent} from '../organisms'
import {useHomeList} from '../../../Hooks/home'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Col, Row} from 'antd'
import {OrganizationCard} from '../../../Components/Cards'
import {useStore} from 'effector-react'
import {$orgModel} from '../../../Models/org-model'
import {useHistory} from 'react-router-dom'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {OrganizationCardSkeleton} from '../../../Components/Cards/OrganizationCard'

const skeleton = generateSkeleton(10)
export const Home = () => {
    const {push} = useHistory()
    const {loadMore} = useHomeList()
    const {$allOrgList: {data, result, loading, forceLoading}} = useStore($orgModel)
    
    const handleSearchClick = () => {
        console.log('search icon clicked')
    }
    
    const handleOrgItemClick = (item) => {
        push(`/${item.slug_name}/offerings`)
    }
    
    return (
        <RootContent paddingTop={62}>
            <FixedHeader component={<HomeFixedHeaderComponent searchClick={handleSearchClick}/>}/>
            <InfiniteScroll
                next={loadMore}
                hasMore={!loading && !!result.next}
                dataLength={result.nextOffset || 10}
                loader={<>...loading</>}
            >
                <Row className='container' gutter={[0, 12]}>
                    {
                        forceLoading === 2
                            ? (
                                <>
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
                                </>
                            )
                            : (
                                <>
                                    {
                                        skeleton.map((item, idx) => (
                                            <Col span={24} key={`${idx + 1}`}>
                                                <OrganizationCardSkeleton/>
                                            </Col>
                                        ))
                                    }
                                </>
                            )
                    }
                </Row>
            </InfiniteScroll>
        
        </RootContent>
    )
}
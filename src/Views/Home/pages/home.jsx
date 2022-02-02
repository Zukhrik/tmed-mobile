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

export const Home = () => {
    const {loadMore} = useHomeList()
    const {$allOrgList: {data, result, loading, forceLoading}} = useStore($orgModel)
    
    const handleSearchClick = () => {
        console.log('search icon clicked')
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
                                <Col span={24}>
                                    skeleton
                                </Col>
                            )
                    }
                </Row>
            </InfiniteScroll>
        
        </RootContent>
    )
}
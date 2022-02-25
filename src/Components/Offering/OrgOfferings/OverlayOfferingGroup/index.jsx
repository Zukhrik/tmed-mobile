import React, {useCallback} from 'react'
import {OfferGroupWrapper} from '../style'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {OfferingGroupItem} from '../OfferingGroupItem'
import {URL_KEYS} from '../../../../Constants'
import {useUrlParams} from '../../../../Hooks/app'
import {useLocation} from 'react-router-dom'
import {Input} from '../../../../UIComponents/Inputs'
import InfiniteScroll from 'react-infinite-scroll-component'
import {$offeringsModel} from '../../../../Models/offerings-model'

export const OverlayOfferingGroup = ({loadMore}) => {
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()
    const groupId = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const {$offeringGroupList: {data, loading, result}} = useStore($offeringsModel)
    
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
    
    
    return (
        <OfferGroupWrapper>
            <InfiniteScroll
                next={loadMore}
                dataLength={result?.nextOffset || 20}
                hasMore={!loading && !!result?.next}
                loader={<>...loading</>}
            >
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Input/>
                    </Col>
                    {
                        data && data.map((item, idx) => (
                            <Col
                                className='centered'
                                key={`${idx + 1}`} span={8}
                            >
                                <OfferingGroupItem
                                    name={item.name}
                                    imgUrl={item.image}
                                    path={generateUrl(item.id)}
                                    isActive={() => groupId && groupId === String(item.id)}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </OfferGroupWrapper>
    )
}
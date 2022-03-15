import React, {useState} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$appModel} from '../../../Models/app'
import {useQueryOfferingList} from '../../../Hooks/offerings'
import {OverlaySettings} from '../../../Components/Overlay'
import InfiniteScroll from 'react-infinite-scroll-component'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useOrgOrder, useOrgOrderList} from '../../../Hooks/order'
import {useBodyOverflowHidden} from '../../../Hooks/app'
import {numberFormat} from '../../../utils/number-utils'
import {ProductCard, ProductCardSkeleton} from '../../../Components/Cards'
import {Col, Row} from 'antd'

const skeleton = generateSkeleton(10, 100, 220)
export const OfferingsList = () => {
    useOrgOrderList()
    const {organization} = useParams()
    const [auth, setAuth] = useState(false)
    const {currency, getIsLoading, onCreatingCartItem} = useOrgOrder()
    const [offeringItem, setOfferingItem] = useState(false)
    const {$app: {token, changeOrgGroupPanel, showSpecPanel}} = useStore($appModel)
    useBodyOverflowHidden(changeOrgGroupPanel || showSpecPanel)
    const {list, dataLength, orgOfferQuery: {isLoading, hasNextPage, fetchNextPage}} = useQueryOfferingList()
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOfferingItem(false)
    }
    
    return (
        <>
            <OverlaySettings
                openSettings={offeringItem}
                onClose={handleClose}
                content={<OverlayAuth
                    action={() => onCreatingCartItem(offeringItem)}
                    auth={auth}
                    setAuth={setAuth}
                    onClose={handleClose}
                />}
            />
            <InfiniteScroll
                next={() => fetchNextPage()}
                dataLength={dataLength}
                hasMore={!isLoading && !!hasNextPage}
                loader={<>...loading</>}
            >
                <Row gutter={[12, 12]}>
                    {
                        !isLoading
                            ? (
                                list?.length > 0 && list.map((item, idx) => {
                                    const offeringData = {
                                        id: item.id,
                                        qty: item.qty,
                                        name: item.name,
                                        image: item.image,
                                        currency: currency,
                                        loading: getIsLoading(item.id),
                                        inCart: item.is_in_cart,
                                        organization: organization,
                                        cost: numberFormat(item.cost),
                                        responsible: item.responsible,
                                        path: `/${organization}/offerings/${item.id}`
                                    }
                                    return (
                                        <Col span={12} key={idx + 1}>
                                            <ProductCard
                                                showBag
                                                isLoading={isLoading}
                                                item={offeringData}
                                                handleClick={(item) => {
                                                    !!token
                                                        ? onCreatingCartItem(item)
                                                        : setOfferingItem(item)
                                                }}
                                            />
                                        </Col>
                                    )
                                })
                            ) : (
                                skeleton.map((item, idx) => (
                                    <Col span={12} key={idx + 1}>
                                        <ProductCardSkeleton/>
                                    </Col>
                                ))
                            )
                    }
                </Row>
            </InfiniteScroll>
            {/*{*/}
            {/*    list && list?.length === 0 && (*/}
            {/*        <EmptyContainerWrapper>*/}
            {/*            <NoOfferingSvg/>*/}
            {/*        </EmptyContainerWrapper>*/}
            {/*    )*/}
            {/*}*/}
        </>
    )
}
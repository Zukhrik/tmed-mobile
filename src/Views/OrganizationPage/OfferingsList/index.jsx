import React, {useMemo, useState} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {OfferingListWrapper} from '../style'
import {$appModel, changeSpecPanel, switchOrgGroupPanel} from '../../../Models/app'
import {useOfferingList} from '../../../Hooks/offerings'
import {OverlaySettings} from '../../../Components/Overlay'
import InfiniteScroll from 'react-infinite-scroll-component'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useOrgOrder, useOrgOrderList} from '../../../Hooks/order'
import Masorny, {ResponsiveMasonry} from 'react-responsive-masonry'
import {OverlayOfferingGroup, OverlaySpecialists} from '../../../Components/Offering/OrgOfferings'
import {useBodyOverflowHidden} from '../../../Hooks/app'
import {useInfiniteQuery} from 'react-query'
import orgApi from '../../../Service-v2/organization'
import {numberFormat} from '../../../utils/number-utils'
import {ProductCard, ProductCardSkeleton} from '../../../Components/Cards'
import {EmptyContainerWrapper} from '../../../UIComponents/GlobalStyles'
import {NoOfferingSvg} from '../../../Icons/NoOffering'

const skeleton = generateSkeleton(10, 100, 220)
export const OfferingsList = () => {
    useOrgOrderList()
    const {organization} = useParams()
    const {$app: {token, changeOrgGroupPanel, showSpecPanel}} = useStore($appModel)
    useBodyOverflowHidden(changeOrgGroupPanel || showSpecPanel)
    const {loadMoreOfferingGroup} = useOfferingList()
    const [auth, setAuth] = useState(false)
    const {currency, checkoutOffering} = useOrgOrder()
    const [offeringItem, setOfferingItem] = useState(false)
    
    const {isLoading, hasNextPage, fetchNextPage, data} = useInfiniteQuery(
        ['/org/offerings', organization],
        async ({pageParam = 0}) => {
            const params = {
                limit: 10,
                offset: pageParam
            }
            const res = await orgApi.getOrgOffering({slug: organization, params})
            return {...res.data, nextOffset: pageParam + 10}
        },
        {
            enabled: !!organization,
            getNextPageParam: (data) => {
                if (data.count - data.nextOffset > 10) {
                    return data?.nextOffset
                } else {
                    return undefined
                }
            }
        }
    )
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOfferingItem(false)
    }
    
    const list = useMemo(() => {
        if (data?.pages && data?.pages.length > 0) {
            const arr = data?.pages
            let tmp = []
            for (let g of arr) {
                tmp = [...tmp, ...g.result]
            }
            return tmp
        }
        return []
    }, [data])
    
    const dataLength = useMemo(() => {
        return data?.pages ? data.pages[data.pages.length - 1]?.nextOffset || 10 : 10
    }, [data])
    
    
    return (
        <>
            <OverlaySettings
                openSettings={changeOrgGroupPanel}
                content={<OverlayOfferingGroup loadMore={loadMoreOfferingGroup}/>}
                onClose={() => switchOrgGroupPanel(false)}
            />
            <OverlaySettings
                openSettings={showSpecPanel}
                onClose={() => changeSpecPanel(false)}
                content={<OverlaySpecialists/>}
            />
            <OverlaySettings
                openSettings={offeringItem}
                onClose={handleClose}
                content={<OverlayAuth
                    action={() => checkoutOffering(offeringItem)}
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
                <OfferingListWrapper>
                    <ResponsiveMasonry
                        style={{padding: '0 12px'}}
                        columnsCountBreakPoints={{350: 2, 768: 2, 900: 3}}
                    >
                        <Masorny gutter='8px'>
                            {
                                !isLoading
                                    ? (
                                        list?.length > 0 && list.map((item) => {
                                            const offeringData = {
                                                id: item.id,
                                                qty: item.qty,
                                                name: item.name,
                                                image: item.image,
                                                currency: currency,
                                                loading: item.loading,
                                                inCart: item.is_in_cart,
                                                organization: organization,
                                                cost: numberFormat(item.cost),
                                                responsible: item.responsible,
                                                path: `/${organization}/offerings/${item.id}`
                                            }
                                            return (
                                                <ProductCard
                                                    showBag
                                                    key={item.id}
                                                    item={offeringData}
                                                    handleClick={(item) => {
                                                        token ? checkoutOffering(item) : setOfferingItem(item)
                                                    }}
                                                />
                                            )
                                        })
                                    ) : (
                                        skeleton.map((item, idx) => (
                                            <ProductCardSkeleton
                                                key={`${idx + 1}`}
                                                imgSkeletonHeight={item}
                                            />
                                        ))
                                    )
                            }
                        </Masorny>
                    </ResponsiveMasonry>
                </OfferingListWrapper>
            </InfiniteScroll>
            {
                data?.pages && data?.pages?.count === 0 && (
                    <EmptyContainerWrapper>
                        <NoOfferingSvg/>
                    </EmptyContainerWrapper>
                )
            }
        </>
    )
}
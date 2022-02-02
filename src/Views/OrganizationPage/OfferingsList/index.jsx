import React, {useState} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {OfferingListWrapper} from '../style'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {NoOfferingSvg} from '../../../Icons/NoOffering'
import {numberFormat} from '../../../utils/number-utils'
import {useOfferingList} from '../../../Hooks/offerings'
import {AuthModal} from '../../../UIComponents/AuthModal'
import {OverlaySettings} from '../../../Components/Overlay'
import InfiniteScroll from 'react-infinite-scroll-component'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {$offeringsModel} from '../../../Models/offerings-model'
import {useOrgOrder, useOrgOrderList} from '../../../Hooks/order'
import Masorny, {ResponsiveMasonry} from 'react-responsive-masonry'
import {EmptyContainerWrapper} from '../../../UIComponents/GlobalStyles'
import {ProductCard, ProductCardSkeleton} from '../../../Components/Cards'

const skeleton = generateSkeleton(10, 100, 220)
export const OfferingsList = () => {
    useOrgOrderList()
    const {organization} = useParams()
    const {$app: {token}, $device} = useStore($appModel)
    const {loadMoreOfferings} = useOfferingList()
    const [auth, setAuth] = useState(false)
    const {currency, checkoutOffering} = useOrgOrder()
    const [offeringItem, setOfferingItem] = useState(false)
    const {$offeringsList: {data, result, loading, forceLoading}} = useStore($offeringsModel)
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOfferingItem(false)
    }
    
    return (
        <>
            {
                $device && $device === INFO_MAT
                    ? <AuthModal
                        modalIsOpen={!!offeringItem}
                        action={() => checkoutOffering(offeringItem)}
                        onCancel={() => setOfferingItem(null)}
                    />
                    : <OverlaySettings
                        openSettings={offeringItem}
                        onClose={handleClose}
                        content={<OverlayAuth
                            action={() => checkoutOffering(offeringItem)}
                            auth={auth}
                            setAuth={setAuth}
                            onClose={handleClose}
                        />}
                    />
            }
            <OfferingListWrapper>
                <InfiniteScroll
                    next={loadMoreOfferings}
                    dataLength={result?.nextOffset || 20}
                    hasMore={!loading && !!result?.next}
                    loader={<>...loading</>}
                >
                    <ResponsiveMasonry
                        style={{padding: '0 12px'}}
                        columnsCountBreakPoints={{350: 2, 768: 2, 900: 3}}
                    >
                        {
                            forceLoading === 2
                                ? <Masorny gutter='8px' style={{marginBottom: 60}}>
                                    {
                                        data && data.length > 0 && data.map((item, idx) => {
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
                                                    key={`${idx + 1}`}
                                                    item={offeringData}
                                                    handleClick={(item) => {
                                                        token ? checkoutOffering(item) : setOfferingItem(item)
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Masorny>
                                : <Masorny gutter='12px'>
                                    {
                                        skeleton.map((item, idx) => (
                                            <ProductCardSkeleton
                                                key={`${idx + 1}`}
                                                imgSkeletonHeight={item}
                                            />
                                        ))
                                    }
                                </Masorny>
                        }
                    </ResponsiveMasonry>
                </InfiniteScroll>
            </OfferingListWrapper>
            {
                result && result.count === 0 && (
                    <EmptyContainerWrapper>
                        <NoOfferingSvg/>
                    </EmptyContainerWrapper>
                )
            }
        </>
    )
}
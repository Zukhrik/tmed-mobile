import React from 'react'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {useOrgOrderCarts, useOrgOrderDelete} from '../../../Hooks/order'
import {$accountModel} from '../../../Models/account-model'
import {$orderModel} from '../../../Models/order-model'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Col, Row} from 'antd'
import {OfferingHorizontalCard} from '../../../Components/Cards'
import {ManageCount} from './manage-count'
import {INFO_MAT} from '../../../Constants/app'
import {Text} from '../../../UIComponents/Typography/Text'
import {OfferingHorizontalCardSkeleton} from '../../../Components/Cards/OfferingHorizontalCardSkeleton'
import {generateSkeleton} from '../../../utils/skeleton-utils'

const skeleton = generateSkeleton(1)
export const UnregisteredOfferings = () => {
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    const {loadMore} = useOrgOrderCarts()
    const {handleDelete, organization} = useOrgOrderDelete()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$orgOrderCartList: {data, result, loading, forceLoading}} = useStore($orderModel)
    
    return (
        <>
            {
                forceLoading === 2
                    ? <InfiniteScroll
                        style={{overflow: 'visible'}}
                        next={loadMore}
                        dataLength={result?.[organization]?.nextOffset || 10}
                        hasMore={!loading && !!result?.[organization]?.next}
                        loader={<>...loading</>}
                    >
                        <Row gutter={[0, 12]}>
                            {
                                data && organization && data?.[organization]?.length > 0 &&
                                data?.[organization]?.map((item, idx) => (
                                    <Col
                                        key={`${idx + 1}`}
                                        span={24}
                                    >
                                        <OfferingHorizontalCard
                                            data={item}
                                            id={item.offering.id}
                                            imgUrl={item.offering.image}
                                            name={item.offering.name}
                                            cost={
                                                `${item.total_cost.toLocaleString('fi-Fi')}
                                            ${currentProfile.currency.code}`
                                            }
                                            manageCount={<ManageCount
                                                item={item}
                                                countValue={item.qty}
                                                measurement={item.offering.measurement}
                                            />}
                                            handleDelete={handleDelete}
                                        />
                                    </Col>
                                ))
                            }
                            {
                                !!result
                                && <>
                                    {
                                        forceLoading === 2 && $device && $device === INFO_MAT
                                            ? (
                                                <Text level={4}>
                                                    {
                                                        `${t('total_cost')}:
                                                        ${result?.[organization]?.total_cost?.toLocaleString('fi-Fi')}
                                                            ${currentProfile?.currency?.code?.toUpperCase()}`
                                                    }
                                                </Text>
                                            )
                                            : ''
                                    }
                                </>
                            }
                        </Row>
                    </InfiniteScroll>
                    : <Row gutter={[0, 12]}>
                        {
                            skeleton.map((item, idx) => (
                                <Col span={24} key={`${idx + 1}`}>
                                    <OfferingHorizontalCardSkeleton/>
                                </Col>
                            ))
                        }
                    </Row>
            }
        </>
    )
}
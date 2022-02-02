import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {TapeItems} from '../../TapeTypes'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {useAuthorTape} from '../../../Hooks/tape'
import {PostSkeleton} from '../../Post/PostSkeleton'
import {$tapeModel} from '../../../Models/tape-model'
import {NoOfferingSvg} from '../../../Icons/NoOffering'
import InfiniteScroll from 'react-infinite-scroll-component'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {EmptyContainerWrapper, RootContent} from '../../../UIComponents/GlobalStyles'

const skeleton = generateSkeleton(10)
export const UserTape = () => {
    const {loadMore} = useAuthorTape()
    const {$device} = useStore($appModel)
    const {$authorTape: {data, forceLoading, result, loading}} = useStore($tapeModel)
    
    return (
        <RootContent
            paddingTop={$device && $device === INFO_MAT && '245px'}
        >
            {
                forceLoading === 2
                    ? (
                        <>
                            {
                                data && data.length > 0
                                    ? <InfiniteScroll
                                        next={loadMore}
                                        hasMore={!loading && !!result?.next}
                                        dataLength={result?.nextOffset || 10}
                                        loader={<>...loading</>}
                                    >
                                        <>
                                            {
                                                data.map((item, idx) => (
                                                    <TapeItems
                                                        key={`${idx + 1}`}
                                                        data={item}
                                                    />
                                                ))
                                            }
                                        </>
                                    </InfiniteScroll>
                                    : <EmptyContainerWrapper>
                                        <NoOfferingSvg/>
                                    </EmptyContainerWrapper>
                            }
                        </>
                    ) : <Row>
                        {
                            skeleton.map((item, idx) => (
                                <Col
                                    span={24}
                                    key={`${idx + 1}`}
                                >
                                    <PostSkeleton/>
                                </Col>
                            ))
                        }
                    </Row>
            }
        </RootContent>
    )
}
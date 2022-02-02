import React from 'react'
import {useStore} from 'effector-react'
import {useAuthorTape} from '../../../Hooks/tape'
import {$tapeModel} from '../../../Models/tape-model'
import {TapeItems} from '../../../Components/TapeTypes'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {PostSkeleton} from '../../../Components/Post/PostSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

const skeleton = generateSkeleton(10)
export const OrganizationTape = () => {
    const {loadMore} = useAuthorTape()
    const {$authorTape: {data, forceLoading, result, loading}} = useStore($tapeModel)
    
    return (
        <>
            {
                forceLoading === 2
                    ? <InfiniteScroll
                        next={loadMore}
                        style={{overflow: 'visible'}}
                        hasMore={!loading && !!result.next}
                        dataLength={result.nextOffset || 10}
                        loader={<>...loading</>}
                    >
                        {
                            data.map((item, idx) => (
                                <TapeItems
                                    key={`${idx + 1}`}
                                    data={item}
                                />
                            ))
                        }
                    </InfiniteScroll>
                    : <>
                        {
                            skeleton.map((item, idx) =>
                                <PostSkeleton
                                    key={`${idx + 1}`}
                                />)
                        }
                    </>
            }
        </>
    )
}
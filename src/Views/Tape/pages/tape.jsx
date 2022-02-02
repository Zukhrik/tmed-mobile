import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {useAllTape} from '../../../Hooks/tape'
import {INFO_MAT} from '../../../Constants/app'
import {$tapeModel} from '../../../Models/tape-model'
import {TapeItems} from '../../../Components/TapeTypes'
import {FixedHeader} from '../../../Components/FixedHeader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {TapeFixedHeader} from '../molecules/tape-fixed-header'
import {PostSkeleton} from '../../../Components/Post/PostSkeleton'
import {AllScreenModal} from '../../../UIComponents/AllScreenModal'
import {CreateModalPost} from '../../../Components/Post/CreateModalPost'


const skeleton = generateSkeleton(10)
export const TapePage = () => {
    const {loadMore} = useAllTape()
    const {$device} = useStore($appModel)
    const [createPost, setCreatePost] = useState(false)
    const {$allTape: {data, forceLoading, result, loading}} = useStore($tapeModel)
    
    return (
        <RootContent
            paddingTop={$device && $device === INFO_MAT ? '80px' : '50px'}
            paddingBottom={$device && $device === INFO_MAT ? '' : '60px'}
            // background='#F2F2F2'
        >
            <AllScreenModal
                title='search'
                modalIsOpen={createPost}
                onCancel={() => setCreatePost(false)}
                content={<CreateModalPost setCreatePost={setCreatePost}/>}
            />
            <FixedHeader
                component={<TapeFixedHeader
                    setCreatePost={setCreatePost}/>}
            />
            {
                forceLoading === 2
                    ? (
                        <InfiniteScroll
                            next={loadMore}
                            style={{overflow: 'visible', background: '#F2F2F2'}}
                            hasMore={!loading && !!result.next}
                            dataLength={result.nextOffset || 10}
                            loader={<>...loading</>}
                        >
                            {
                                data && data.length > 0 && data.map((item, idx) => (
                                    <TapeItems
                                        key={`${idx + 1}`}
                                        data={item}
                                    />
                                ))
                            }
                        </InfiniteScroll>
                    )
                    : <Row gutter={[0, 12]} style={{paddingTop: 12}}>
                        {
                            skeleton.map((item, idx) => (
                                <Col
                                    key={`${idx + 1}`}
                                    span={24}
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
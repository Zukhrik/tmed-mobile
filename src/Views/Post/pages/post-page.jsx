import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useGoBack} from '../../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {Feedback} from '../../Tape/organisms'
import {$appModel} from '../../../Models/app'
import {$postModel} from '../../../Models/post-model'
import {PostPageWrapper} from '../atoms'
import {FixedHeader} from '../../../Components/FixedHeader'
import {useGetPost, usePostComments} from '../../../Hooks/post'
import {ShortCard} from '../../../Components/Cards'
import {CommentList, PageIndicators, PostDescription, PostGallery, PostPageSkeleton} from '../organisms'
import {INFO_MAT} from '../../../Constants/app'


export const PostPage = () => {
    useGetPost()
    const {t} = useTranslation()
    const {post_id} = useParams()
    const {loadMore} = usePostComments()
    const {$app: {saveURL}, $device} = useStore($appModel)
    const {$getPost: {data, forceLoading}} = useStore($postModel)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : '/'})
    
    return (
        <PostPageWrapper
            paddingTop={$device && $device === INFO_MAT ? 92 : 62}
        >
            <FixedHeader
                goBack={goBack}
                title={t('comments')}
            />
            {
                forceLoading === 2
                    ? (
                        <Row gutter={[0, 12]}>
                            <Col span={24} className='padding'>
                                <ShortCard
                                    imgSize={40}
                                    imgUrl={data?.[post_id]?.author?.avatar}
                                    name={data?.[post_id]?.author?.name}
                                    text={data?.[post_id] && data[post_id]?.author?.sub_text}
                                />
                            </Col>
                            <Col span={24} className='padding post-description'>
                                <PostDescription
                                    description={
                                        data && post_id && data[post_id] && !data?.[post_id]?.text
                                            ? data?.[post_id]?.stream_schedule?.description
                                            : data?.[post_id]?.text
                                    }
                                    title={
                                        data?.[post_id]?.stream_schedule && data[post_id]?.stream_schedule?.title}
                                />
                            </Col>
                            <Col span={24}>
                                <PostGallery/>
                                <PageIndicators data={data[post_id]}/>
                            </Col>
                            <Col span={24} className='padding'>
                                <CommentList loadMore={loadMore}/>
                            </Col>
                        </Row>
                    )
                    : <PostPageSkeleton/>
            }
            <Feedback/>
        </PostPageWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useCommentItem} from '../../../Hooks/post'
import {$postModel} from '../../../Models/post-model'
import {CommentCard} from '../../../Components/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {useChangeDateLang} from '../../../Hooks/app'


export const CommentList = ({loadMore}) => {
    const {
        $getPostComments: {data, result, loading},
        $commentReplyList: {data: replyList}
    } = useStore($postModel)
    const {changeDateLang} = useChangeDateLang()
    const {post_id, handleDelete, handleLike, handleReply, handleReplyList} = useCommentItem()
    
    return (
        <RootContent>
            {
                data && post_id && data[post_id] && (
                    <InfiniteScroll
                        style={{overflow: 'hidden'}}
                        next={loadMore}
                        dataLength={result[post_id].nextOffset || 10}
                        hasMore={!loading && !!result[post_id].next}
                    >
                        <Row gutter={[0, 16]}>
                            {
                                data[post_id].map((item, idx) => (
                                    <Col
                                        span={24}
                                        key={`${idx + 1}`}
                                    >
                                        <CommentCard
                                            handleReplyList={handleReplyList}
                                            slug_name={item.author.slug_name}
                                            imgUrl={item.author.avatar}
                                            handleDelete={handleDelete}
                                            handleReply={handleReply}
                                            likes={item.likes_count}
                                            name={item.author.name}
                                            isLiked={item.is_liked}
                                            handleLike={handleLike}
                                            text={item.text}
                                            id={item.id}
                                            date={changeDateLang(item.date)}
                                            item={item}
                                            repliesCount={item.replies_count}
                                            commentReplyLis={replyList}
                                            category={item.author.sub_text}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </InfiniteScroll>
                )
            }
        </RootContent>
    )
}
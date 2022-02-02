import React from 'react'
import {Col, Row} from 'antd'
import {HeartSvg} from '../../../Icons/Heart'
import {Avatar} from '../../../UIComponents/Avatar'
import {MessageCircleSvg} from '../../../Icons/Message'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {
    CommentActionsWrapper,
    CommentCardWrapper,
    CommentDataWrapper,
    CommentOwnerNameWrapper,
    CommentTimeAndMoreWrapper,
    ViewReplyWrapper
} from './style'
import {DeleteSvg} from '../../../Icons/Trash'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {LineSvg} from '../../../Icons/Line'

export const CommentCard = (
    {
        id,
        size,
        name,
        item,
        text,
        date,
        likes,
        imgUrl,
        isLiked,
        category,
        slug_name,
        handleLike,
        handleReply,
        handleDelete,
        repliesCount,
        handleReplyList,
        commentReplyLis
    }
) => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    
    return (
        <CommentCardWrapper>
            <Row wrap={false}>
                <Col>
                    <Avatar
                        shape='circle'
                        size={40}
                        imgUrl={imgUrl}
                    />
                </Col>
                <Col flex={1} className='comment-data'>
                    <CommentDataWrapper>
                        <CommentOwnerNameWrapper>
                            <Text>{name}</Text>
                            <CommentTimeAndMoreWrapper>
                                <Text className='account-category'>{date}</Text>
                            </CommentTimeAndMoreWrapper>
                        </CommentOwnerNameWrapper>
                        <Text className='account-category'>
                            {category}
                        </Text>
                        <Text>{text}</Text>
                    </CommentDataWrapper>
                    <CommentActionsWrapper>
                        <IconBox
                            onClick={() => handleLike(item)}
                            color={
                                isLiked
                                    ? 'var(--danger-dwed)'
                                    : 'var(--grey-dwed)'
                            }
                        >
                            <HeartSvg/>
                            <Text>{t('like')}</Text>
                        </IconBox>
                        <IconBox
                            color='var(--grey-dwed)'
                            onClick={() => handleReply(item)}
                        >
                            <MessageCircleSvg/>
                            <Text>{t('reply')}</Text>
                        </IconBox>
                        {
                            currentProfile?.slug_name === slug_name && (
                                <IconBox
                                    color='var(--grey-dwed)'
                                    onClick={() => handleDelete(item)}
                                >
                                    <DeleteSvg/>
                                    <Text>{t('delete')}</Text>
                                </IconBox>
                            )
                        }
                        <IconBox className='likes-count'>
                            <Text>{`${likes} ${t('likes')}`}</Text>
                        </IconBox>
                    </CommentActionsWrapper>
                    {
                        commentReplyLis.map((item, idx) => item.reply_to === id && (
                            <Row
                                wrap={false}
                                key={`${idx + 1}`}
                                className='reply-comment-wrapper'
                            >
                                <Col>
                                    <Avatar
                                        shape='circle'
                                        size={32}
                                        imgUrl={item.author.avatar}
                                    />
                                </Col>
                                <Col flex={1}>
                                    <CommentDataWrapper>
                                        <CommentOwnerNameWrapper>
                                            <Text>{item.author.name}</Text>
                                            <CommentTimeAndMoreWrapper>
                                                <Text className='account-category'>{date}</Text>
                                            </CommentTimeAndMoreWrapper>
                                        </CommentOwnerNameWrapper>
                                        <Text className='account-category'>
                                            {category || 'user category'}
                                        </Text>
                                        <Text>{item.text}</Text>
                                    </CommentDataWrapper>
                                    <CommentActionsWrapper>
                                        <IconBox
                                            color={
                                                item.is_liked
                                                    ? 'var(--danger-dwed)'
                                                    : 'var(--grey-dwed)'
                                            }
                                        >
                                            <HeartSvg/>
                                            <Text>{t('like')}</Text>
                                        </IconBox>
                                        <IconBox className='likes-count'>
                                            <Text>{`${item.likes_count} ${t('likes')}`}</Text>
                                        </IconBox>
                                    </CommentActionsWrapper>
                                </Col>
                            </Row>
                        ))
                    }
                    {
                        repliesCount > 0 && commentReplyLis.length === 0 && (
                            <ViewReplyWrapper onClick={() => handleReplyList(item)}>
                                <LineSvg/>
                                {t('view_reply', {count: repliesCount})}
                            </ViewReplyWrapper>
                        )
                    }
                </Col>
            </Row>
        </CommentCardWrapper>
    )
}
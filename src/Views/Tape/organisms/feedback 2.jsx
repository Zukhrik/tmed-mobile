import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {useCreatePostComment} from '../../../Hooks/post'
import {FeedbackInput, LeaveFeedbackWrapper, ReplyItemWrapper} from '../atoms'
import {CloseSvg} from '../../../Icons/Close'
import {Button} from '../../../UIComponents/Button'
import {SendSvg} from '../../../Icons/Send'


export const Feedback = () => {
    const {t} = useTranslation()
    const {$app: {onReplyCommentData}} = useStore($appModel)
    const {handleSubmit, setComment, comment, handleCloseReply} = useCreatePostComment()
    
    return (
        <LeaveFeedbackWrapper>
            {
                onReplyCommentData && (
                    <Row
                        align='middle'
                        justify='space-between'
                        style={{fontSize: 8, fontWeight: 300, color: '#000'}}
                    >
                        <Col flex={1}>
                            <Row>
                                <Col span={24}>
                                    {`${t('reply')} ${onReplyCommentData.author.name}`}
                                </Col>
                                <Col span={24}>
                                    {onReplyCommentData.text}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <ReplyItemWrapper onClick={handleCloseReply}>
                                <CloseSvg/>
                            </ReplyItemWrapper>
                        </Col>
                    </Row>
                )
            }
            <form onSubmit={handleSubmit}>
                <Row gutter={[12, 0]} justify='space-between' align='middle'>
                    <Col flex={1}>
                        <FeedbackInput
                            type='text'
                            value={comment}
                            placeholder={t('to_comment_on')}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Col>
                    <Col className='arrow-wrapper'>
                        <Button
                            variant='primary'
                            htmlType='submit'
                        >
                            <SendSvg/>
                        </Button>
                    </Col>
                </Row>
            </form>
        </LeaveFeedbackWrapper>
    )
}
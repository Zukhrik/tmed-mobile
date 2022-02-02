import React from 'react'
import {Col, Row} from 'antd'
import {Avatar} from '../../../UIComponents/Avatar'
import {ChatOwnerInfoWrapper, ChatTextWrapper} from '../atoms'

export const ChatCard = ({item, owner}) => {
    
    return (
        <Row wrap={false} gutter={[12, 0]} align='middle'>
            <Col>
                <Avatar
                    imgUrl={item.user.avatar}
                    size={32}
                />
            </Col>
            <Col flex={1}>
                <ChatOwnerInfoWrapper
                    color={item.user.username === owner ? 'var(--professional-color)' : ''}
                >
                    {
                        !item.user.full_name || item.user.full_name === ' '
                            ? item.user.username
                            : item.user.full_name
                    }
                </ChatOwnerInfoWrapper>
                <ChatTextWrapper>
                    {item.text}
                </ChatTextWrapper>
            </Col>
        </Row>
    )
}
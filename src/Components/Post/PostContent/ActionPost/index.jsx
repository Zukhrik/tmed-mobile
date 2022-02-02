import React from 'react'
import {Avatar} from '../../../../UIComponents/Avatar'
import {ActionPostWrapper} from '../../style'
import {Col, Row} from 'antd'

export const ActionPost = ({imgUrl1, imgUrl2, size1, size2, type}) => {

    const style = {
        padding: type === 'new_avatar' ? 10 : 0,
        backgroundColor: type === 'new_avatar' ? '#fff' : 'transparent',
        marginLeft: type === 'new_avatar' ? -90 : -60,
        borderRadius: '50%',
        width: type === 'new_avatar' ? size2 + 20 : size2,
        height: type === 'new_avatar' ? size2 + 20 : size2
    }

    return (
        <ActionPostWrapper>
            <Row gutter={0} justify='center' align='middle'>
                <Col span='auto'>
                    <Avatar
                        shape='circular'
                        size={size1}
                        imgUrl={imgUrl1}
                    />
                </Col>
                <Col span='auto' style={style}>
                    <Avatar
                        size={size2}
                        shape='circular'
                        imgUrl={imgUrl2}
                    />
                </Col>
            </Row>
        </ActionPostWrapper>
    )
}
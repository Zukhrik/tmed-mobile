import React from 'react'
import {Col, Row} from 'antd'
import {usePostPageIndicator} from '../../../Hooks/post'
import {postControlData} from '../../../data'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {POST_ACTIONS} from '../../../Constants'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconItemWrapper} from '../atoms'
import {useTranslation} from 'react-i18next'


export const PageIndicators = ({data}) => {
    const {t} = useTranslation()
    const {handleChangeLike} = usePostPageIndicator(data)
    
    return (
        <Row align='middle' justify='space-around'
             style={{borderBottom: ' 1px solid rgba(38, 38, 38, 0.1)', height: 40}}>
            {
                data && postControlData.map(item => {
                    const Icon = item.icon(data.is_liked)
                    return (
                        <Col
                            key={item.icon}
                        >
                            <IconItemWrapper
                                onClick={() => handleChangeLike(item)}
                            >
                                <IconBox
                                    color={
                                        item.count === POST_ACTIONS.LIKES_COUNT && !!data.is_liked
                                            ? 'var(--danger-dwed)'
                                            : 'var(--grey-dwed)'
                                    }
                                >
                                    <Icon/>
                                </IconBox>
                                <Text>
                                    {t(item.title)}
                                </Text>
                            </IconItemWrapper>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
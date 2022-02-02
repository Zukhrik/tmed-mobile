import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {PostMoreWrapper} from '../style'
import {useTranslation} from 'react-i18next'
import {useHistory, useParams} from 'react-router-dom'
import {Text} from '../../../UIComponents/Typography/Text'
import {deletePostMount} from '../../../Models/tape-model'
import {currentPostMoreList, postMore} from '../../../data'
import {$appModel, saveURLMount} from '../../../Models/app'
import {$accountModel} from '../../../Models/account-model'

export const PostMore = ({data}) => {
    const {t} = useTranslation()
    const {username} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {push, location: {pathname}} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    const handleItemClick = useCallback((action) => {
        const author = currentProfile && `@${currentProfile.slug_name}`
        const params = {
            post_id: data.id,
            author
        }
        if (!!token) {
            if (action === 'delete') {
                deletePostMount(params)
            }
            
            if (action === 'repost') {
                saveURLMount(pathname)
                push(`/repost/${params.post_id}`)
            }
        }
    }, [data.id, currentProfile, push, token, pathname])
    
    return (
        <PostMoreWrapper>
            <Row align='middle'>
                {
                    (currentProfile && currentProfile.slug_name === username) ||
                    (currentProfile && currentProfile.slug_name) === data.author.slug_name
                        ? currentPostMoreList.map((item, idx) => {
                            const Icon = item.icon
                            return (
                                <Col
                                    span={24}
                                    key={`${idx + 1}`}
                                    style={{whiteSpace: 'nowrap'}}
                                    onClick={() => handleItemClick(item.text)}
                                >
                                    <Row
                                        wrap={false}
                                        align='middle'
                                        justify='space-between'
                                    >
                                        <Col>
                                            <Text>
                                                {t(`${item.text}`)}
                                            </Text>
                                        </Col>
                                        <Col className='icon-box'>
                                            <Icon/>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                        : postMore.map((item, idx) => {
                            const Icon = item.icon
                            return (
                                <Col
                                    span={24}
                                    key={`${idx + 1}`}
                                    style={{whiteSpace: 'nowrap'}}
                                    onClick={() => handleItemClick(item.text)}
                                >
                                    <Row
                                        gutter={12}
                                        wrap={false}
                                        align='middle'
                                        justify='space-between'
                                    >
                                        <Col>
                                            <Text>
                                                {t(`${item.text}`)}
                                            </Text>
                                        </Col>
                                        <Col className='icon-box'>
                                            <Icon/>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                }
            </Row>
        </PostMoreWrapper>
    )
}
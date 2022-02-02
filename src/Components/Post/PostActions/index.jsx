import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {SlideDown} from 'react-slidedown'
import {useTranslation} from 'react-i18next'
import {postControlData} from '../../../data'
import {OverlaySettings} from '../../Overlay'
import {POST_ACTIONS} from '../../../Constants'
import {usePostActions} from '../../../Hooks/post'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../Models/account-model'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'
import {CardControlWrapper, IconItemWrapper, PostIndicatorItem} from '../style'


export const PostActions = ({data}) => {
    const {t} = useTranslation()
    const [auth, setAuth] = useState(false)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {getStyle, handleClick, generatePostIndicators, openOverlay, setOpenOverlay} = usePostActions(data)
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOpenOverlay(false)
    }
    
    return (
        <CardControlWrapper>
            {
                !currentProfile && (
                    <OverlaySettings
                        openSettings={openOverlay}
                        onClose={handleClose}
                        content={<OverlayAuth
                            auth={auth}
                            setAuth={setAuth}
                            onClose={handleClose}
                        />}
                    />
                )
            }
            <Row>
                <SlideDown style={{width: '100%'}}>
                    {
                        (data.likes_count > 0 || data.comments_count > 0 || data.repost_count > 0) &&
                        <Col span={24} className='post-indicator-wrapper'>
                            {
                                postControlData.map(item => {
                                    const Icon = item.icon()
                                    return (
                                        <PostIndicatorItem key={item.icon}>
                                            <Icon/>
                                            <Text>
                                                {generatePostIndicators(item)}
                                            </Text>
                                        </PostIndicatorItem>
                                    )
                                })
                            }
                        </Col>
                    }
                </SlideDown>
                <Col span={24}>
                    <Row justify='space-around'>
                        {
                            postControlData.map((item) => {
                                const Icon = item.icon(data.is_liked)
                                return (
                                    <Col
                                        key={item.icon}
                                        style={getStyle}
                                    >
                                        <IconItemWrapper onClick={() => handleClick(item.count)}>
                                            <IconBox
                                                color={
                                                    item.count === POST_ACTIONS.LIKES_COUNT && !!data.is_liked
                                                        ? 'var(--danger-dwed)'
                                                        : 'var(--grey-dwed)'
                                                }
                                            >
                                                <Icon/>
                                                <Text>
                                                    {t(item.title)}
                                                </Text>
                                            </IconBox>
                                        </IconItemWrapper>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </CardControlWrapper>
    )
}
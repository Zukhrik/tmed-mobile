import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {AccountInfoWrap} from '../style'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {Button} from '../../../UIComponents/Button'
import {Avatar} from '../../../UIComponents/Avatar'
import {PageBodyNavigate} from '../PageBodyNavigate'
import {Text} from '../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {SkeletonUI, SkeletonWrapper} from '../../../UIComponents/GlobalStyles'


export const UserPageHeader = (
    {
        name,
        category,
        imgUrl,
        forceLoading,
        subscription,
        followers,
        following
    }
) => {
    const {t} = useTranslation()
    const {push} = useHistory()
    const {username, organization} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    const handleClickTo = (evt) => {
        if (evt === 'followers') {
            if (username) {
                push(`/@${username}/followers`)
            } else if (organization) {
                push(`/${organization}/followers`)
            }
        } else if (evt === 'following') {
            if (username) {
                push(`/@${username}/followings`)
            } else if (organization) {
                push(`/${organization}/followings`)
            }
        }
    }
    
    return (
        <AccountInfoWrap>
            <Row justify='space-between'>
                <Col span={24} className='padding'>
                    <Row gutter={[12, 0]} justify='space-between' align='middle'>
                        <Col>
                            {
                                forceLoading === 2
                                    ? <Avatar
                                        imgUrl={imgUrl}
                                        shape='circle'
                                        size={70}
                                    />
                                    : <SkeletonUI
                                        variant='circle'
                                        width={70}
                                        height={70}
                                    />
                            }
                        </Col>
                        <Col flex={1}>
                            <Row justify='space-around'>
                                <Col
                                    className='account-subs-wrapper'
                                    onClick={() => handleClickTo('followers')}
                                >
                                    {followers}
                                    <Text>{t('followers')}</Text>
                                </Col>
                                <Col
                                    className='account-subs-wrapper'
                                    onClick={() => handleClickTo('following')}
                                >
                                    {following}
                                    <Text>{t('following')}</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                    className='short-info-wrapper'
                >
                    {
                        forceLoading === 2
                            ? <Row
                                gutter={[0, 4]}
                            >
                                <Col span={24}>
                                    <Title
                                        level={5}
                                    >
                                        {name}
                                    </Title>
                                </Col>
                                <Col span={24}>
                                    <Text>
                                        {category}
                                    </Text>
                                </Col>
                            </Row>
                            : <Row gutter={[0, 4]}>
                                <Col
                                    span={24}
                                >
                                    <SkeletonWrapper height={22}>
                                        <SkeletonUI
                                            variant='rect'
                                            width='100%'
                                            height={12}
                                        />
                                    </SkeletonWrapper>
                                </Col>
                                <Col span={24}>
                                    <SkeletonWrapper height={18.84}>
                                        <SkeletonUI
                                            variant='rect'
                                            width='100%'
                                            height={12}
                                        />
                                    </SkeletonWrapper>
                                </Col>
                            </Row>
                    }
                </Col>
                {
                    !!token && !!currentProfile && currentProfile.slug_name !== username && (
                        <Col
                            span={24}
                            className='subs-button-wrapper'
                            onClick={() => subscription.toggle()}
                        >
                            {
                                forceLoading === 2
                                    ? <Button
                                        variant={
                                            subscription.text === t('subscribe')
                                                ? 'primary'
                                                : 'outlined'
                                        }
                                    >
                                        {t(subscription.text)}
                                    </Button>
                                    : <div style={{height: 30, display: 'flex', alignItems: 'center'}}>
                                        <SkeletonUI variant='rect' height={12} width='100%'/>
                                    </div>
                            }
                        </Col>
                    )
                }
                <Col span={24}>
                    <PageBodyNavigate/>
                </Col>
            </Row>
        </AccountInfoWrap>
    )
}
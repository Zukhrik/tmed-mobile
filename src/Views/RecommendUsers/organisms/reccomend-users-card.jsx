import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {ShortCard} from '../../../Components/Cards'
import {PeopleCardWrapper} from '../atoms'
import {$accountModel} from '../../../Models/account-model'
import {Button} from '../../../UIComponents/Button'
import {Text} from '../../../UIComponents/Typography/Text'
import {degreesData} from '../../../data'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const RecommendUserCard = ({text, path, item, name, imgUrl, username, subscribed, handleSubscribe}) => {
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    
    return (
        <PeopleCardWrapper>
            <Row
                wrap={false}
                align='middle'
                justify='space-between'
                gutter={[8, 0]}
            >
                <Col>
                    <ShortCard
                        imgUrl={imgUrl}
                        imgPath={path}
                        imgSize={55}
                        path={path}
                    />
                </Col>
                <Col flex={1}>
                    <Row>
                        <Col span={24}>
                            <Text>{name}</Text>
                        </Col>
                        <Col span={24} className='category-text'>
                            <Text>{text}</Text>
                        </Col>
                        <Col span={24} className='rating-wrapper'>
                            {
                                degreesData.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <IconBox
                                            key={item.icon}
                                            color={item.color}
                                        >
                                            <Icon/>
                                            0
                                        </IconBox>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Col>
                <Col>
                    {
                        currentProfile && currentProfile.slug_name !== username &&
                        <Button
                            onClick={() => handleSubscribe(item)}
                            variant={!subscribed ? 'primary' : ''}
                            disabled={subscribed || !token}
                        >
                            {!subscribed ? t('subscribe') : t('subscribed')}
                        </Button>
                    }
                </Col>
            </Row>
        </PeopleCardWrapper>
    )
}
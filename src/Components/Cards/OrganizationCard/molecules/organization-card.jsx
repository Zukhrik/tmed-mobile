import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {degreesData} from '../../../../data'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../../Models/app'
import {OvalBgSvg} from '../../../../Icons/OvalBg'
import {Avatar} from '../../../../UIComponents/Avatar'
import {useGenerateRating} from '../../../../Hooks/app'
import defaultImage from '../../../../Assets/cards/9.png'
import {IconBox} from '../../../../UIComponents/GlobalStyles'
import {Text} from '../../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../../Models/account-model'
import {Title} from '../../../../UIComponents/Typography/Title'
import {
    AvatarContainerWrapper,
    BackgroundImage,
    OrganizationCardWrapper,
    OrganizationInfoWrapper,
    SubscribeButton
} from '../atoms'
import {useHistory} from 'react-router-dom'

export const OrganizationCard = (
    {
        backgroundImage,
        imgUrl,
        name,
        category,
        aesthetics,
        ethics,
        professional,
        subscribed,
        subscribe,
        slug_name,
        containerPath
    }
) => {
    const {generateRating} = useGenerateRating(aesthetics, ethics, professional)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$app: {token}} = useStore($appModel)
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <OrganizationCardWrapper onClick={() => push(containerPath)}>
            {
                currentProfile && currentProfile.slug_name !== slug_name && token && subscribed &&
                <SubscribeButton>
                    {
                        !subscribed
                            ? <Text onClick={() => subscribe({slug_name, name})}>{t('subscribe')}</Text>
                            : <Text style={{color: '#000'}}>{t('subscribed')}</Text>
                    }
                </SubscribeButton>
            }
            <BackgroundImage
                src={backgroundImage ? backgroundImage : defaultImage}
                alt={backgroundImage}
            />
            <OrganizationInfoWrapper>
                <AvatarContainerWrapper>
                    <OvalBgSvg/>
                    <Avatar
                        size={32}
                        shape='circle'
                        imgUrl={imgUrl}
                    />
                </AvatarContainerWrapper>
                <Row
                    gutter={[4, 0]}
                    align='middle'
                    justify='end'
                >
                    {
                        degreesData.map((item, idx) => {
                            const Icon = item.icon
                            return (
                                <Col
                                    key={`${idx + 1}`}
                                >
                                    <IconBox color={item.color}>
                                        <Icon/>
                                        {generateRating(item.id)}
                                    </IconBox>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Title>{name}</Title>
                <Text color='var(--grey-dwed)'>{category}</Text>
            </OrganizationInfoWrapper>
        </OrganizationCardWrapper>
    )
}
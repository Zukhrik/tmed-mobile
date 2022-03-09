import React from 'react'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../../Models/app'
import {OvalBgSvg} from '../../../../Icons/OvalBg'
import {Avatar} from '../../../../UIComponents/Avatar'
import defaultImage from '../../../../Assets/Images/101.png'
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

export const OrganizationCard = (
    {
        backgroundImage,
        imgUrl,
        name,
        category,
        subscribed,
        subscribe,
        slug_name,
        containerPath
    }
) => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$app: {token}} = useStore($appModel)
    const {t} = useTranslation()
    
    return (
        <OrganizationCardWrapper onClick={containerPath}>
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
                <Title>{name}</Title>
                <Text color='var(--grey-dwed)'>{category}</Text>
            </OrganizationInfoWrapper>
        </OrganizationCardWrapper>
    )
}
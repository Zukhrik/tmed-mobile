import React from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {Avatar} from '../../../UIComponents/Avatar'
import {UserRating} from '../../Progress/UserRating'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {AccountInfoWrapper, FamousCardWrapper, SubscribeWrapper} from './style'
import {subscribeToUserMount} from '../../../Models/user-model'

export const FamousAccountCard = (
    {
        size,
        item,
        path,
        shape,
        imgUrl,
        username,
        fullName,
        category,
        subscribe,
        showRating,
        subscribed
    }
) => {
    const {t} = useTranslation()
    
    const handleSubscribe = (event) => {
        subscribeToUserMount({username: event.username})
    }
    
    return (
        <FamousCardWrapper>
            <AccountInfoWrapper>
                <Link to={path}>
                    <Avatar
                        size={size}
                        imgUrl={imgUrl}
                        shape={shape || 'circular'}
                    />
                    <Title className='account-suggestion-fullname'>{fullName}</Title>
                    <Text className='account-suggestion-category'>{category}</Text>
                </Link>
                {
                    showRating && (
                        <UserRating/>
                    )
                }
            </AccountInfoWrapper>
            <SubscribeWrapper
                bgColor={!subscribed ? '' : '#fff'}
                style={{padding: !showRating && '9px 0'}}
                onClick={() => handleSubscribe(item)}
            >
                {
                    !subscribed
                        ? <Text color='var(--default-white)'>{t('subscribe')}</Text>
                        : <Text color='var(--dark-dwed)'>{t('subscribed')}</Text>
                }
            </SubscribeWrapper>
        </FamousCardWrapper>
    )
}
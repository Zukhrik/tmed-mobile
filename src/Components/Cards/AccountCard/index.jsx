import React from 'react'
import {ShortCard} from '../ShortCard'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {Text} from '../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../Models/account-model'
import {CardWrapper, ShortInfoWrapper, SubscribeWrapper} from './style'
import {AccountCardRatingList} from '../../Progress/AccountCardRatingList'
import {INFO_MAT} from '../../../Constants/app'

export default ({imgUrl, slug_name, name, text, path, imgSize, rating, subscribed, subscribe}) => {
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    const {$app: {token}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <CardWrapper>
            <ShortInfoWrapper>
                <ShortCard
                    name={name}
                    text={text}
                    imgUrl={imgUrl}
                    imgSize={$device && $device === INFO_MAT ? 80 : 56}
                    containerPath={path}
                />
                {
                    currentProfile && currentProfile.slug_name !== slug_name && token &&
                    <SubscribeWrapper>
                        {
                            !subscribed
                                ? <Text onClick={() => subscribe({slug_name, name})}>{t('subscribe')}</Text>
                                : <Text style={{color: '#000'}}>{t('subscribed')}</Text>
                        }
                    </SubscribeWrapper>
                }
            </ShortInfoWrapper>
            {
                rating &&
                <AccountCardRatingList
                    rating={rating}
                />
            }
        </CardWrapper>
    )
}
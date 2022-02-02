import React from 'react'
import {OfferCard} from '../../Cards'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {truncateString} from '../../../utils/stringUtils'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {OfferingsCardWrapper, PostsItemsScrollWrapper} from '../style'

export const TapeOfferings = ({data}) => {
    const {t} = useTranslation()
    const {$detectLocationInfo} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <OfferingsCardWrapper>
            <Title level={3}>{t('popular_offerings')}</Title>
            <PostsItemsScrollWrapper>
                {
                    data && data.length > 0 && data.map((item, idx) => (
                        <OfferCard
                            item={item}
                            key={`${idx + 1}`}
                            imgUrl={item.image}
                            offerName={truncateString(item.name, 14)}
                            cost={
                                `${item.cost.toLocaleString('fi-Fi')}
                                ${currentProfile
                                    ? currentProfile.currency ? currentProfile.currency.code.toUpperCase() : null
                                    : $detectLocationInfo.currency ? $detectLocationInfo.currency.toUpperCase() : null
                                }`
                            }
                        />
                    ))
                }
            </PostsItemsScrollWrapper>
        </OfferingsCardWrapper>
    )
}
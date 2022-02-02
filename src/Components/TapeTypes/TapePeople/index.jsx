import React from 'react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {FamousAccountCard} from '../../Cards'
import {truncateString} from '../../../utils/stringUtils'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {PopularPeopleWrapper, PostsItemsScrollWrapper, TapeHeaderWrapper} from '../style'

export const TapePeople = ({data}) => {
    const {t} = useTranslation()
    const {push} = useHistory()
    
    const separateFullName = (str) => {
        let lastname = ''
        let name = ''
        const idx = str.trim().indexOf(' ')
        
        if (idx !== -1) {
            lastname = str.trim().substring(0, idx)
            name = str.trim().substring(idx + 1)
        } else {
            lastname = str.trim()
        }
        
        return (
            <>
                <span>{truncateString(lastname, 14)}</span>
                <span>{truncateString(name, 14)}</span>
            </>
        )
    }
    
    return (
        <PopularPeopleWrapper>
            <TapeHeaderWrapper>
                <Title>{t('recommend_users')}</Title>
                <Text onClick={() => push('/recommend_users')}>{t('see_all')}</Text>
            </TapeHeaderWrapper>
            <PostsItemsScrollWrapper>
                {
                    data && data.length > 0 && data.map((item, idx) => (
                        <FamousAccountCard
                            size={96}
                            item={item}
                            key={`${idx + 1}`}
                            imgUrl={item.avatar}
                            slug_name={item.username}
                            path={`@${item.username}/tape`}
                            subscribed={item.subs.subscribed}
                            fullName={separateFullName(item.full_name)}
                            category={item.main_cat && truncateString(item.main_cat.name, 16)}
                        />
                    ))
                }
            </PostsItemsScrollWrapper>
        </PopularPeopleWrapper>
    )
}
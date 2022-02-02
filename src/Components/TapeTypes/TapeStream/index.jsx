import React from 'react'
import {TapeTypeStream} from '../../Cards'
import {useTranslation} from 'react-i18next'
import {Title} from '../../../UIComponents/Typography/Title'
import {PostsItemsScrollWrapper, TapeHeaderWrapper, TapeStreamWrapper} from '../style'
import {Text} from '../../../UIComponents/Typography/Text'
import {useHistory} from 'react-router-dom'

export const TapeStream = ({data}) => {
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <TapeStreamWrapper>
            <TapeHeaderWrapper>
                <Title>{t('live_streams')}</Title>
                <Text onClick={() => push('/search?search_type=stream')}>{t('see_all')}</Text>
            </TapeHeaderWrapper>
            <PostsItemsScrollWrapper>
                {
                    data && data.length > 0 && data.map((item, idx) => (
                        <TapeTypeStream
                            key={`${idx + 1}`}
                            src={item.thumbnail}
                            seen={item.live_watchers}
                            path={`/stream/${item.channel_slug}`}
                            imgSrc={item.logo}
                            name={item.channel_name}
                            schedule={item.schedule_name}
                        />
                    ))
                }
            </PostsItemsScrollWrapper>
        </TapeStreamWrapper>
    )
}
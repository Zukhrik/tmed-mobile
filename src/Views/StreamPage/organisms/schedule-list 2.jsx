import React from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {ScheduleCard} from '../../../Components/Cards'
import {$streamModel} from '../../../Models/stream-model'
import {truncateString} from '../../../utils/stringUtils'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import InfiniteScroll from 'react-infinite-scroll-component'

export const ScheduleList = ({loadMore}) => {
    const {t} = useTranslation()
    const {slug_name} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$channelStreamScheduleList: {data: schedule, result, loading}} = useStore($streamModel)
    
    
    return (
        <InfiniteScroll
            next={loadMore}
            loader={<>...loading</>}
            style={{overflow: 'visible', paddingTop: 12}}
            dataLength={result.nextOffset || 10}
            hasMore={!loading && !!result[slug_name].next}
        >
            {
                schedule[slug_name] && schedule[slug_name].length > 0 &&
                <Title level={5} style={{color: 'var(--grey-dwed)'}}>{t('anons')}</Title>
            }
            {
                schedule[slug_name] && schedule[slug_name].map((item, idx) => (
                    <ScheduleCard
                        key={`${idx + 1}`}
                        src={item.image}
                        alt={item.title}
                        date={item.date}
                        title={item.title}
                        scheduleId={item.id}
                        isWanting={item.is_wanting}
                        currentProfile={currentProfile}
                        description={truncateString(item.description, 95)}
                    />
                ))
            }
        </InfiniteScroll>
    )
}
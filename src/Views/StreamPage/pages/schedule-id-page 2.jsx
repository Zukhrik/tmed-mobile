import React from 'react'
import moment from 'moment'
import {useStore} from 'effector-react'
import {useGoBack} from '../../../Hooks/app'
import {useParams} from 'react-router-dom'
import {$appModel} from '../../../Models/app'
import {$streamModel} from '../../../Models/stream-model'
import {useStreamScheduleId} from '../../../Hooks/stream'
import {$accountModel} from '../../../Models/account-model'

export const ScheduleIdPage = () => {
    useStreamScheduleId()
    const {$app: {token}} = useStore($appModel)
    const {slug_name, schedule_id} = useParams()
    const {$streamScheduleId: {data}} = useStore($streamModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: `/stream/${slug_name}`})
    
    return (
        <>
            {
                data[schedule_id] &&
                <ScheduleIdPage
                    token={token}
                    goBack={goBack}
                    data={data[schedule_id]}
                    id={data[schedule_id].id}
                    src={data[schedule_id].image}
                    currentProfile={currentProfile}
                    title={data[schedule_id].title}
                    isWanting={data[schedule_id].is_wanting}
                    description={data[schedule_id].description}
                    date={moment(data[schedule_id].date).format('YYYY-MM-DD HH:mm')}
                />
            }
        </>
    )
}
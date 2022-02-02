import moment from 'moment'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$streamModel, allStreamScheduleMount} from '../../Models/stream-model'

const initialParams = {
    limit: 50,
    offset: 0
}

export function useChannelSchedule() {
    const {$channelStreamScheduleList: {result}} = useStore($streamModel)
    const {slug_name} = useParams()
    
    const loadMore = useCallback(() => {
        let offset = 0
        
        if (slug_name) {
            offset = result[slug_name].nextOffset
        }
        
        const params = {
            ...initialParams,
            offset: offset
        }
        
        allStreamScheduleMount({params, slug_name})
    }, [result, slug_name])
    
    useEffect(() => {
        const params = {
            clear: true,
            ...initialParams,
            date_gte: moment(new Date()).format('YYYY-MM-DD[T00:00:00]'),
            date_lte: moment(new Date()).format('YYYY-MM-DD[T23:59:59]')
        }
        
        allStreamScheduleMount({params: params, slug_name})
    }, [slug_name])
    
    return {
        loadMore
    }
}
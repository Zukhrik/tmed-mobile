import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {streamScheduleIdMount} from '../../Models/stream-model'

export function useStreamScheduleId() {
    const {slug_name, schedule_id} = useParams()
    
    useEffect(() => {
        streamScheduleIdMount({slug_name, schedule_id})
    }, [slug_name, schedule_id])
}
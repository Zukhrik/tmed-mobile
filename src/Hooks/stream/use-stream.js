import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {streamMount} from '../../Models/stream-model'

export function useStream() {
    const {slug_name} = useParams()
    
    useEffect(() => {
        streamMount({slug_name})
    }, [slug_name])
}
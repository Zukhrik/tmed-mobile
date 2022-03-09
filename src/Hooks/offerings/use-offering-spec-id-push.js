import {useEffect} from 'react'
import {URL_KEYS} from '../../Constants'
import {useHistory, useParams} from 'react-router-dom'
import {useUrlParams} from '../app'
import {useQuery} from 'react-query'
import orgApi from '../../Service-v2/organization'

export function useOfferingSpecIdPush() {
    const {urlData} = useUrlParams()
    const {push} = useHistory()
    const {offering_id} = useParams()
    
    const {data: res} = useQuery(
        ['/offers/id', offering_id],
        () => orgApi.getOfferingId(offering_id),
        {
            enabled: !!offering_id
        }
    )
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            if (!urlData[URL_KEYS.SPECIALIST_ID]) {
                if (res?.data?.responsible?.length > 0) {
                    push(`?${URL_KEYS.SPECIALIST_ID}=${res?.data?.responsible?.[0].id}`)
                }
            }
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [res, urlData, push])
}
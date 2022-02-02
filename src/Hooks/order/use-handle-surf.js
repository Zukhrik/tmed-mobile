import moment from 'moment'
import {useCallback} from 'react'
import {useUrlParams} from '../app'
import {useCheckout} from '../checkout'
import {URL_KEYS} from '../../Constants'
import {useHistory} from 'react-router-dom'


export function useHandleSurf() {
    const {urlData} = useUrlParams()
    const next = urlData[URL_KEYS.NEXT]
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {push, location: {pathname}} = useHistory()
    const {comment, meetDate, activeDay} = useCheckout()
    
    const handleSurf = useCallback(() => {
        const url = []
        
        if (specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }
        
        if (activeDay) {
            url.push(`${URL_KEYS.DATE}=${activeDay}`)
        }
        
        if (meetDate) {
            url.push(`${URL_KEYS.TIME}=${moment(meetDate).format('HH:mm')}`)
        }
        if (comment && comment.trim().length > 0) {
            url.push(`${URL_KEYS.TEXT}=${comment}`)
        }
        
        url.push(`${URL_KEYS.NEXT}=1`)
        
        push({
            pathname,
            search: url.join('&')
        })
    }, [specId, activeDay, comment, meetDate, pathname, push])
    
    return {handleSurf, next}
}
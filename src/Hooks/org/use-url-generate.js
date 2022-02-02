import {useUrlParams} from '../app'
import {useCallback} from 'react'
import {URL_KEYS} from '../../Constants'
import {useHistory} from 'react-router-dom'

export function useUrlGenerate() {
    const {urlData} = useUrlParams()
    const {location: {pathname}} = useHistory()
    
    const generateUrl = useCallback((url_keys, id) => {
        const url = []
        
        if (urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]}`)
        }
        
        if (!urlData[url_keys] || urlData[url_keys] !== String(id)) {
            url.push(`${url_keys}=${id}`)
        }
        
        return {
            pathname,
            search: url.join('&')
        }
        
    }, [pathname, urlData])
    
    const getActive = useCallback((url_keys, id) => {
        return urlData[url_keys] && urlData[url_keys] === String(id)
    }, [urlData])
    
    return {generateUrl, getActive}
}
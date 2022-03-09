import {useEffect, useState} from 'react'
import {URL_KEYS} from '../../Constants'
import {useUrlParams} from './use-url-params'

export function useListQuery() {
    const {urlData} = useUrlParams()
    const spec = urlData[URL_KEYS.SPECIALIST_ID]
    const search = urlData[URL_KEYS.SEARCH]
    const group = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const [query, setQuery] = useState(null)
    
    
    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            const tmp = {}
            if (group) {
                tmp['group'] = group
            }
            if (spec) {
                tmp['responsible'] = spec
            }
            if (search) {
                tmp['search'] = search
            }
            setQuery(tmp)
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [group, spec, search])
    
    return {query, setQuery}
}
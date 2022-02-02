import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {orgSpecialistCatMount, orgSpecialistsMount} from '../../Models/org-model'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useOrgSpecialistLists() {
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const spec_cat_id = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]
    
    const getOrgSpecialists = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            orgSpecialistsMount(data)
        }
    }, [organization])
    
    const getOrgSpecCatList = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            orgSpecialistCatMount(data)
        }
    }, [organization])
    
    
    useEffect(() => {
        const data = {
            clear: true,
            params: {...initialParams}
        }
        getOrgSpecCatList(data)
    }, [getOrgSpecCatList])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }
            
            if (spec_cat_id) {
                data['params']['spec_cat'] = spec_cat_id
            } else {
                delete data['params']['spec_cat']
            }
            
            getOrgSpecialists(data)
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
        
    }, [getOrgSpecialists, spec_cat_id])
}
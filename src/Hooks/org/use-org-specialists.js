import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$orgModel, orgSpecialistsMount} from '../../Models/org-model'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOrgSpecialistLists() {
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$app: {showSpecPanel}} = useStore($appModel)
    const {$orgSpecialistsList: {result}} = useStore($orgModel)
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
    
    // const getOrgSpecCatList = useCallback((params) => {
    //     if (organization) {
    //         const data = {
    //             organization,
    //             ...params
    //         }
    //         orgSpecialistCatMount(data)
    //     }
    // }, [organization])
    
    const loadMore = useCallback(() => {
        if (result?.nextOffset) {
            const data = {
                organization: organization,
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            orgSpecialistsMount(data)
        }
    }, [result, organization])
    
    // useEffect(() => {
    //     const data = {
    //         clear: true,
    //         params: {...initialParams}
    //     }
    //     getOrgSpecCatList(data)
    // }, [getOrgSpecCatList])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }
            
            if (showSpecPanel) {
                if (spec_cat_id) {
                    data['params']['spec_cat'] = spec_cat_id
                } else {
                    delete data['params']['spec_cat']
                }
                
                getOrgSpecialists(data)
            }
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
        
    }, [getOrgSpecialists, spec_cat_id, showSpecPanel])
    
    return {loadMore}
}
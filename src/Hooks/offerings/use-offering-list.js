import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {
    $offeringsModel,
    offeringForceLoading,
    orgOfferGroupListMount,
    orgOfferingsListMount
} from '../../Models/offerings-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useOfferingList() {
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const group = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const specialist = urlData[URL_KEYS.SPECIALIST_ID]
    const {$offeringsList: {result}} = useStore($offeringsModel)
    const {$offeringGroupList: {result: offeringGroupResult}} = useStore($offeringsModel)

    
    const getOfferingGroupList = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            orgOfferGroupListMount(data)
        }
        
    }, [organization])
    
    const getOrgOfferingsList = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            orgOfferingsListMount(data)
        }
    }, [organization])
    
    const loadMoreOfferings = useCallback(() => {
        if (result.nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            
            if (specialist) {
                data['params']['responsible'] = specialist
            } else {
                delete data['params']['responsible']
            }
            
            if (group) {
                data['params']['group'] = group
            }
            
            getOrgOfferingsList(data)
        }
    }, [getOrgOfferingsList, specialist, group, result])
    
    const loadMoreOfferingGroup = useCallback(() => {
        if (offeringGroupResult?.nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    offset: offeringGroupResult?.nextOffset
                }
            }
            getOfferingGroupList(data)
        }
    }, [offeringGroupResult, getOfferingGroupList])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }
            
            if (specialist) {
                data['params']['specialist'] = specialist
            } else {
                delete data['params']['specialist']
            }
            
            getOfferingGroupList(data)
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [specialist, getOfferingGroupList])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }
            
            if (specialist) {
                data['params']['responsible'] = specialist
            } else {
                delete data['params']['responsible']
            }
            
            if (group) {
                data['params']['group'] = group
            }
            offeringForceLoading()
            getOrgOfferingsList(data)
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getOrgOfferingsList, specialist, group])
    
    return {
        loadMoreOfferings,
        loadMoreOfferingGroup
    }
}
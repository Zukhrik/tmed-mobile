import {useUrlParams} from '../app'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {useCallback, useEffect} from 'react'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {$orgModel, allOrgMount} from '../../Models/org-model'
import {$userModel, allUserMount} from '../../Models/user-model'
import {$streamModel, allStreamMountList} from '../../Models/stream-model'
import {$offeringsModel, offeringsListMount} from '../../Models/offerings-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useHomeList() {
    const {urlData} = useUrlParams()
    const searchType = urlData[URL_KEYS.SEARCH_TYPE]
    const _category = urlData[URL_KEYS.CATEGORY]
    const {$appLang: lang} = useStore($appModel)
    const {$allOrgList: {result: allOrgResult}} = useStore($orgModel)
    const {$allUserList: {result: allUserResult}} = useStore($userModel)
    const {$allStreamList: {result: allStreamResult}} = useStore($streamModel)
    const {$offeringsList: {result: offeringsResult}} = useStore($offeringsModel)
    
    
    const getList = useCallback((params) => {
        if (!searchType) {
            if (_category) {
                params.params.category = _category
            }
            allOrgMount(params)
        }
        
        if (searchType && searchType === URL_VALUES.OFFERINGS) {
            if (_category) {
                params.params.offer_cat = _category
            }
            offeringsListMount(params)
        }
        
        if (searchType && searchType === URL_VALUES.PEOPLE) {
            allUserMount(params)
        }
        
        if (searchType && searchType === URL_VALUES.STREAM) {
            allStreamMountList(params)
        }
    }, [searchType, _category])
    
    const loadMore = useCallback(() => {
        const params = {...initialParams}
        
        if (searchType === URL_VALUES.PEOPLE) {
            if (allUserResult.nextOffset) {
                params['offset'] = allUserResult.nextOffset
            }
        }
        
        if (!searchType) {
            if (allOrgResult.nextOffset) {
                params['offset'] = allOrgResult.nextOffset
            }
        }
        
        if (searchType === URL_VALUES.STREAM) {
            if (allStreamResult.nextOffset) {
                params['offset'] = allStreamResult.nextOffset
            }
        }
        
        if (searchType === URL_VALUES.OFFERINGS) {
            if (offeringsResult.nextOffset) {
                params['offset'] = offeringsResult.nextOffset
            }
        }
        
        getList({params})
    }, [getList, allUserResult, searchType, allStreamResult, allOrgResult, offeringsResult])
    
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }
            if (lang) {
                getList(data)
            }
            
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getList, searchType, lang])
    
    return {
        loadMore
    }
}
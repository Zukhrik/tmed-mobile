import {useCallback, useEffect} from 'react'
import {useUrlParams} from '../app'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {$catsModel, catsOfferCatsMount, catsOrgCatsMount} from '../../Models/cats-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useCategoryList() {
    const {urlData} = useUrlParams()
    const searchType = urlData[URL_KEYS.SEARCH_TYPE]
    const {urlData: {category}} = useUrlParams()
    const {$catsOfferCats: {result}} = useStore($catsModel)
    
    
    const loadMore = useCallback(() => {
        if (result?.nextOffset) {
            const data = {
                clear: true,
                ...initialParams,
                offset: result.nextOffset
            }
            catsOfferCatsMount(data)
        }
    }, [result])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            if (!searchType) {
                const params = {
                    clear: true,
                    parent_slug: category ? category : 0,
                    params: {
                        ...initialParams
                    }
                }
                catsOrgCatsMount(params)
            } else if (searchType === URL_VALUES.OFFERINGS) {
                const data = {
                    clear: true,
                    parent: category ? category : 0,
                    params: {
                        ...initialParams
                    }
                }
                catsOfferCatsMount(data)
            }
        }, 300)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [searchType, category])
    
    return {loadMore}
}
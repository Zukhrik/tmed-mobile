import {useCallback, useState} from 'react'
import {allOrgMount} from '../../Models/org-model'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {allUserMount} from '../../Models/user-model'
import {useUrlParams} from '../app'
import {useLocation} from 'react-router-dom'
import {offeringsListMount} from '../../Models/offerings-model'

export function useHomeSearch() {
    const {urlData} = useUrlParams()
    const {pathname, search} = useLocation()
    const searchType = urlData[URL_KEYS.SEARCH_TYPE]
    const [searchValue, setSearchValue] = useState('')
    
    const getActive = (id) => {
        if (id === 'organization' && search === '') {
            return pathname === '/search'
        } else {
            return searchType && searchType === id
        }
    }
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (searchValue.trim().length > 0) {
            const data = {
                clear: true,
                params: {
                    search: searchValue
                }
            }
            
            if (!searchType) {
                allOrgMount(data)
            }
            
            if (searchType && searchType === URL_VALUES.PEOPLE) {
                allUserMount(data)
            }
            
            if (searchType && searchType === URL_VALUES.OFFERINGS) {
                offeringsListMount(data)
            }
            
            setSearchValue('')
        }
    }, [searchType, searchValue])
    
    return {handleSubmit, searchValue, setSearchValue, getActive}
}
import {useCallback, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {URL_KEYS} from '../../Constants'


export function useOrgOfferSearch() {
    const {push} = useHistory()
    const {organization} = useParams()
    const [searchText, setSearchText] = useState('')
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (searchText.trim().length > 0) {
            push(`?${URL_KEYS.SEARCH}=${searchText}`)
        } else if (searchText.trim().length === 0) {
            push(`/${organization}/offerings`)
        }
    }, [push, searchText, organization])
    
    
    const handleChange = useCallback((value) => {
        if (value.length === 0) {
            push(`/${organization}/offerings`)
        }
        setSearchText(value)
    }, [organization, push])
    
    return {handleSubmit, handleChange, searchText}
}
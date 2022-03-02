import {useCallback, useState} from 'react'
import {useParams} from 'react-router-dom'
import {orgOfferingsListMount} from '../../Models/offerings-model'


export function useOrgOfferSearch() {
    const {organization} = useParams()
    const [searchText, setSearchText] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchText.trim().length > 0) {
            const params = {
                organization: organization,
                params: {
                    search: searchText,
                    clear: true
                }
            }
            orgOfferingsListMount(params)
        }
    }
    
    const handleChange = useCallback((value) => {
        if (value.length === 0) {
            const params = {
                organization: organization,
                clear: true
            }
            orgOfferingsListMount(params)
        }
        setSearchText(value)
    }, [organization])
    
    return {handleSubmit, handleChange, searchText}
}
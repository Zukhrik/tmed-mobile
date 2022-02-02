import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {orgOfferingsListMount} from '../../Models/offerings-model'


export function useOrgOfferSearch() {
    const {organization} = useParams()
    const [searchText, setSearchText] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchText.trim().length > 0) {
            let params = {
                organization: organization,
                params: {
                    search: searchText,
                    clear: true
                },
            }
            orgOfferingsListMount(params)
        }
    }
    
    return {handleSubmit, setSearchText, searchText}
}
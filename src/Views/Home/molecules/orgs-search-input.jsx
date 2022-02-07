import React, {useState} from 'react'
import {OrgSearchInputWrapper} from '../atoms'
import {Input} from '../../../UIComponents/Inputs'
import {SearchSvg} from '../../../Icons/Search'
import {allOrgMount} from '../../../Models/org-model'

export const OrgsSearchInput = () => {
    const [orgSearch, setOrgSearch] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (orgSearch.length > 0) {
            const data = {
                clear: true,
                params: {
                    search: orgSearch
                }
            }
            allOrgMount(data)
        }
    }
    
    return (
        <OrgSearchInputWrapper onSubmit={(e) => handleSubmit(e)}>
            <Input
                onChange={(e) => setOrgSearch(e.target.value)}
            />
            <SearchSvg/>
        </OrgSearchInputWrapper>
    )
}
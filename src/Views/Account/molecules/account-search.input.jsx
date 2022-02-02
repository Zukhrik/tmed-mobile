import React from 'react'
import {Input} from '../../../UIComponents/Inputs'
import {SearchSvg} from '../../../Icons/Search'
import {SearchInputWrapper} from '../atoms'

export const AccountSearchInput = ({search, setSearch, handleSubmit}) => {
    
    return (
        <SearchInputWrapper onSubmit={handleSubmit}>
            <Input
                placeholder='search account'
                icon={<SearchSvg/>}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </SearchInputWrapper>
    )
}
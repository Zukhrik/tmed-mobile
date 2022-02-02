import React, {useState} from 'react'
import {Avatar} from '../../Avatar'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {debounce} from '../../../utils/debounce-utils'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const AutocompleteSelect = (
    {
        label,
        error,
        onBlur,
        search,
        options,
        loading,
        onSearch,
        onChange,
        onLoadMore,
        helperText,
        staticError,
        defaultValue,
        hideErrorText,
        ...props
    }
) => {
    const [inputValue, setInputValue] = useState('')
    const renderOption = (option) => {
        return (
            <>
                {option.image && <Avatar imgUrl={option.image} size={24}/>}
                {option.label}
            </>
        )
    }
    
    const handleChange = (e, newValue) => {
        onChange(newValue)
    }
    
    const handleBlur = () => {
        if (inputValue.length > 0) {
            debounce(onSearch(''), 300)
            setInputValue('')
        }
        onBlur()
    }
    
    return (
        <StyledFormControl>
            <Autocomplete
                {...props}
                limitTags={2}
                options={options}
                onBlur={handleBlur}
                autoComplete
                loading={loading}
                includeInputInList
                popupIcon={<ArrowIosBottomSvg/>}
                renderOption={renderOption}
                filterOptions={(v) => v}
                classes={{paper: 'select-dropdown'}}
                getOptionLabel={option => option.label}
                ListboxProps={{onScroll: onLoadMore, style: {maxHeight: 30 * 8 + 8}}}
                onChange={(e, value) => handleChange(e, value)}
                getOptionSelected={(option, values) => props.multiple ? option.value === values.value : !!option.value && !!values.value}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                debounce(onSearch(e.target.value), 300)
                            }}
                            label={label}
                            variant='filled'
                            error={!!error}
                        />
                    )
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
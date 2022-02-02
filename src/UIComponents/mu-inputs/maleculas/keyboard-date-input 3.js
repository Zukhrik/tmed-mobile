import React, {useEffect, useRef, useState} from 'react'
import {KeyboardDatePicker} from '@material-ui/pickers'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const KeyboardDateInput = (
    {
        value,
        label,
        variant,
        disableFuture,
        disablePast,
        helperText,
        hideErrorText,
        error,
        format,
        onChange,
        ...props
    }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [inputValue, setInputValue] = useState(null)
    const divRef = useRef(null)
    
    const onDateChange = (date, value) => {
        onChange(date)
        setInputValue(value)
    }
    
    useEffect(() => {
        setAnchorEl(divRef.current)
    }, [divRef])
    
    return (
        <StyledFormControl ref={divRef}>
            <KeyboardDatePicker
                {...props}
                value={value}
                error={!!error}
                onChange={onDateChange}
                disablePast={disablePast || false}
                disableFuture={!!disableFuture || false}
                autoOk
                format={format || 'YYYY-MM-DD'}
                inputValue={inputValue}
                variant='inline'
                label={label}
                PopoverProps={{
                    anchorEl,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    },
                    classes: {paper: 'select-dropdown'}
                }}
                inputVariant={variant || 'standard'}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
import React from 'react'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'
import {TextField} from '@material-ui/core'

export const TextareaInput = ({error, label, hideErrorText, rows, helperText, staticError, ...props}) => {
    
    return (
        <StyledFormControl>
            <TextField
                {...props}
                multiline
                label={label}
                error={!!error}
                maxRows={rows || 4}
                variant='filled'
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
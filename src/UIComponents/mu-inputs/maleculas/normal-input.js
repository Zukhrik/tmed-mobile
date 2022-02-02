import React from 'react'
import {
    StyledHelperText,
    StyledInputError,
    StyledFormControl
} from '../atoms'
import {IconBox} from '../../GlobalStyles'
import {TextField} from '@material-ui/core'

export const NormalInput = ({label, error, helperText, hideErrorText, readOnly, icon, ...props}) => {

    return (
        <StyledFormControl
            error={!!error}
        >
            <TextField
                {...props}
                label={label}
                variant='filled'
                error={!!error}
                InputProps={{
                    readOnly: readOnly || false,
                    endAdornment: icon && <IconBox>{icon}</IconBox>
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
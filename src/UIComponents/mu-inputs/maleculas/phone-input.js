import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const PhoneInput = ({label, helperText, hideErrorText, error, icon, staticError, ...props}) => {
    return (
        <StyledFormControl>
            <MuiPhoneNumber
                {...props}
                label={label}
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                error={!!error}
                variant='filled'
                size='small'
                defaultCountry={'uz'}
                onlyCountries={['uz']}
                masks={{uz: '.. ...-..-..'}}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
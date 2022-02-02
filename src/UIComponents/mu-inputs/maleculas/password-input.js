import React, {useState} from 'react'
import {IconBox} from '../../GlobalStyles'
import {TextField} from '@material-ui/core'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'
import {EyeOffSvg, RemoveEyeReadSvg} from '../../../Icons/Eye'

export const PasswordInput = ({label, error, helperText, hideErrorText, readOnly, icon, staticError, ...props}) => {
    const [type, setType] = useState(true)
    
    return (
        <StyledFormControl
            error={!!error}
        >
            <TextField
                {...props}
                label={label}
                error={!!error}
                variant='filled'
                type={type ? 'password' : 'text'}
                InputProps={{
                    readOnly: readOnly || false,
                    endAdornment: props.value && props.value.length > 0 ?
                        <IconBox onClick={() => setType(!type)}>{type ? <RemoveEyeReadSvg/> :
                            <EyeOffSvg/>}</IconBox> : <></>
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
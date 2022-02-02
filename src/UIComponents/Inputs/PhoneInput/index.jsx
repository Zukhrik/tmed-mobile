import React from 'react';
import PhoneInputIntl from 'react-phone-input-2';
import {InputIcon, StyledErrorText, StyledFormControl} from '../style';

export const PhoneInput = ({icon, error, onBlur, name, ...props}) => {
  return (
     <StyledFormControl error={!!error}>
       <PhoneInputIntl
          country={'uz'}
          masks={{uz: '.. ...-..-..'}}
          onlyCountries={['uz']}
          {...props}
          onBlur={onBlur}
          inputProps={{onBlur, name}}
          disableDropdown
       />
       {
         icon && <InputIcon>{icon}</InputIcon>
       }
       {error && <StyledErrorText>{error}</StyledErrorText>}
     </StyledFormControl>
  )
}
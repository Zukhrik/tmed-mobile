import React from 'react';
import {InputIcon, StyledErrorText, StyledFormControl, StyledInput} from '../style';

export const NormalInput = ({error, icon, ...props}) => {
  return (
     <StyledFormControl error={!!error}>
       <StyledInput {...props} autocomplete="off"/>
       {
         icon && <InputIcon>{icon}</InputIcon>
       }
       {error && <StyledErrorText>{error}</StyledErrorText>}
     </StyledFormControl>
  )
}
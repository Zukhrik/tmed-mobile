import React from 'react';
import {InputIcon, StyledSelect, StyledFormControl} from '../style';

export const SelectInput = ({icon, ...props}) => {
  return (
     <StyledFormControl>
       <StyledSelect {...props}/>
       {
         icon && <InputIcon>{icon}</InputIcon>
       }
     </StyledFormControl>
  )
}
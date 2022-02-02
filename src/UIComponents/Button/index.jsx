import React from 'react';
import {StyledButton} from './style';

export const Button = ({children, ...props}) => {
  return (
     <StyledButton {...props}>
       {children}
     </StyledButton>
  )
}
import React, {useState} from 'react';
import {LockFillSvg, UnlockFillSvg} from '../../../Icons/LockFill';
import {InputIcon, StyledErrorText, StyledFormControl, StyledInput} from '../style';

export const PasswordInput = ({error, icon, ...props}) => {
  const [type, setType] = useState(true);

  return (
     <StyledFormControl error={!!error}>
       <StyledInput
          type={type ? 'password' : 'text'}
          {...props} autocomplete='off'
       />
       <InputIcon onClick={() => setType(!type)}>
         {
           type
              ? <LockFillSvg/>
              : <UnlockFillSvg/>
         }
       </InputIcon>
       {error && <StyledErrorText>{error}</StyledErrorText>}
     </StyledFormControl>
  );
};
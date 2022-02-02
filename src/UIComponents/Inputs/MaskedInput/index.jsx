import React from "react";
import {InputIcon, StyledErrorText, StyledFormControl, StyledInput} from "../style";
import InputMask from "react-input-mask";

export const MaskedInput = ({error, icon, mask, disabled, onBlur, onChange, ...props}) => (
   <StyledFormControl error={!!error}>
     <InputMask
        mask={mask ? mask : '***-***'}
        maskChar="_"
        onChange={onChange}
        onBlur={onBlur}
        {...props}
     >{(inputProps) => {
       const allProps = {...inputProps, onBlur, disabled}
       return <StyledInput {...allProps} autocomplete="off"/>
     }}</InputMask>

     {
       icon && <InputIcon>{icon}</InputIcon>
     }
     {error && <StyledErrorText>{error}</StyledErrorText>}
   </StyledFormControl>
)
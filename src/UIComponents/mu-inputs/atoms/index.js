import styled from 'styled-components'
import {Button} from '../../Button'
import {IconBox} from '../../GlobalStyles'
import {StyledAvatar} from '../../Avatar/style'
import {Chip, MenuItem} from '@material-ui/core'

export const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .MuiFormLabel-asterisk {
    color: var(--danger-dwed) !important;
  }

  .MuiFilledInput-inputMarginDense {
    padding-bottom: 20px;
  }

  .MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiPhoneNumber-flagButton {
    bottom: 7px;
  }

  .MuiFilledInput-underline:after {
    border-bottom: none;
  }

  .MuiFilledInput-underline.Mui-disabled:before {
    border-bottom-style: none;
  }

  //Standard Input
  .MuiFormControl-root.MuiTextField-root {

  }

  .MuiFilledInput-root {
    border-radius: 6px;
    border: 1px solid var(--dark-dwed);
    height: 56px !important;
  }

  .MuiFilledInput-root.Mui-hover {
    border-bottom: transparent;
  }

  .MuiFilledInput-root.Mui-error {
    border: 1px solid var(--danger-dwed);
  }

  .MuiFilledInput-root.Mui-focused {
    color: var(--dark-dwed);
    border: 1px solid var(--primary-dwed);
  }

  .MuiFilledInput-root.Mui-hover {
    border: 1px solid var(--primary-dwed);
  }

  .MuiFilledInput-root.Mui-error.Mui-focused {
    color: var(--dark-dwed);
  }

  .MuiFormLabel-root.Mui-error.Mui-focused {
    color: var(--primary-dwed);
  }

  .MuiFilledInput-root:hover {
    background: var(--default-white);
  }

  .MuiFilledInput-underline:hover:before {
    border: none;
  }

  .MuiFilledInput-underline:before {
    border-bottom: none;
  }


  .MuiFilledInput-underline.Mui-error:after {
    border-bottom: none;
  }

  .MuiFilledInput-underline.Mui-focused:after {
    border: none;
  }

  .MuiPhoneNumber-flagButton {
    z-index: 10;
  }

  .MuiCircularProgress-root {
    z-index: 9;
  }

  .MuiFilledInput-root {
    background: var(--default-white);
  }

  .MuiFilledInput-root.Mui-focused {
    background: var(--default-white);
  }

  .MuiInputLabel-root,
  .MuiFormLabel-root.Mui-error {
    color: var(--grey-dwed);
  }

  .MuiAutocomplete-tag {
    position: relative;
    z-index: 9;
  }

  ${IconBox} {
    position: relative;
    z-index: 10;

    svg {
      width: 24px;
      height: 24px;
      //color: #636366;
      color: var(--grey-dwed);
    }
  }

  .MuiChip-root {
    height: 27px;
    border: 1px solid var(--grey-dwed);
    background: unset;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .MuiSelect-select:focus {
    background-color: unset;
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    text-shadow: 1px 1px 1px rgba(150, 150, 150, .2);
  }

  .MuiInputLabel-outlined {
    transform: translate(14px, 16px) scale(1);
  }

  .MuiOutlinedInput-notchedOutline {
    background-color: var(--input-bg);
  }

  .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
    background-color: var(--input-hover-bg);
    border-color: var(--input-hover-color);
  }

  .MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-border-color);
    background-color: var(--input-bg);
  }

  .MuiInputBase-root.Mui-disabled {
    opacity: .6;
  }

  .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-border-color);
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid var(--primary-dwed);
  }

  .MuiInputBase-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-focus-color);
  }

  .MuiInputBase-root.Mui-focused.Mui-error:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-danger-color);
  }

  .MuiSelect-icon {
    z-index: 5;
    width: 24px;
    height: 24px;
    color: #636366;
  }

  .Mui-focused {
    //color: var(--input-focus-color);
  }

  .Mui-error {
    color: var(--grey-dwed);
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--input-focus-color);
  }

  .Mui-error.Mui-focused {
    color: var(--input-danger-color);
  }

  .MuiAutocomplete-endAdornment {
    z-index: 9;

    svg {
      color: var(--grey-dwed);
    }
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0;
  }

  .MuiChip-root.MuiAutocomplete-tag:first-child {
    margin-left: 16px;
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input {
    padding: 15px 0 15px 16px;
    height: 20px;

    &:first-child {
      padding-left: 16px;
    }
  }

  .MuiOutlinedInput-multiline {
    padding: 0;
  }


  .MuiOutlinedInput-input {
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    color: var(--dark-dwed);
    padding: 15px 16px;
    height: 20px;


    &.MuiOutlinedInput-inputMultiline {
      height: unset;
    }

    &.MuiOutlinedInput-inputAdornedEnd {
      padding-left: 16px;
    }

    &.MuiOutlinedInput-inputAdornedStart {
      padding-right: 16px;
      padding-left: 0;
    }

    .MuiInputBase-root.MuiAutocomplete-input {
      padding-right: 0;
    }
  }
`

export const StyledHelperText = styled.div`
  line-height: 20px;
  font-size: 13px;
  color: var(--primary-dwed);
`

export const StyledInputError = styled.div`
  color: var(--input-danger-color);
  font-size: 13px;
  line-height: 1.2;
  padding: 2px 0;
  position: ${({staticError}) => staticError ? 'static' : 'absolute'};
  left: 0;
  top: 100%;
`

export const StyledOptionItem = styled(MenuItem)`
  display: flex;
  align-items: center;

  ${StyledAvatar} {
    margin-right: 8px;
  }
`

export const MultipleSelectedWrap = styled.div`
  display: flex;
  align-items: center;
`

export const StyledChip = styled(Chip)`
  && {
    height: 25px;
    margin: 0 4px 2px 0
  }
`

export const OptionLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;

  img {
    max-width: 50px;
    height: auto;
  }
`

export const StyledSelected = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 15px;
  color: var(--dark-dwed);
  font-weight: 500;
  z-index: 6;
`

export const UploadInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${IconBox} {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    opacity: 0;
  }

  &:hover {
    ${IconBox} {
      opacity: 1;
    }
  }

  ${Button} {
    border-radius: 4px 0 0 4px;
    min-width: 110px;

    svg {
      margin-right: 8px;
    }
  }

  input {
    flex-grow: 1;
    border-radius: 0 4px 4px 0;
    background: #FBFBFB;
    border: 1px solid #F0F1F2;
    border-left: 0;
    padding: 0 16px;
    height: 40px;
    font-weight: 500;
    color: var(--dark-dwed);
    outline: none;
    cursor: default;

    &::placeholder {
      color: #8F9BB3;
    }
  }
`
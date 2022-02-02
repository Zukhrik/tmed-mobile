import styled, {css} from 'styled-components'
import {Select} from 'antd'

const commonInput = css`
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  padding: 6px 16px;
  transition: .2s ease;
  color: var(--dark-dwed);
  font-family: 'Roboto', sans-serif;
  background-color: #E6E6E6;
  border: 0;

  &::placeholder {
    font-weight: 500;
    color: var(--grey-dwed);
  }
`

export const StyledInput = styled.input`
  ${commonInput};
`

export const StyledFormControl = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border: 1px solid var(--input-border-color);
  border-radius: var(--basic-border-radius);
  ${({error}) => error ? 'var(--danger-dwed)' : 'var(--input-border-color)'};
}

.react-tel-input {
  border-radius: 4px;
  color: ${({error}) => error ? 'var(--danger-dwed)' : ''};
  border: ${({error}) => error ? '1px solid var(--danger-dwed)' : ''} !important;
}

.react-tel-input .form-control {
  width: 100%;
  height: 48px;
  padding-left: 60px;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border-color);
}

.react-tel-input .selected-flag {
  width: 40px;
  padding: 0 0 0 13px;
  border-radius: 4px 0 0 4px;
  border-right: var(--input-border-color);
}

.react-tel-input .flag-dropdown {
  top: 1px;
  border: 0;
  left: 1px;
  bottom: 1px;
  border-radius: 4px 0 0 4px;
}
`

export const InputIcon = styled.div`
  top: 0;
  right: 12px;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--grey-dwed);

  svg {
    width: 24px;
    height: 24px;
  }
`

export const StyledErrorText = styled.div`
  padding: 4px 0;
  font-size: 13px;
  line-height: 1.1;
  color: var(--danger-dwed);
`

export const StyledSelect = styled(Select)`
  position: relative;

  ${StyledInput} {
    border-color: ${({error}) => error ? 'var(--danger-dwed)' : 'var(--input-border-color)'};
    background-color: var(--input-bg);

    &:focus {
      border-color: var(--primary-dwed);
    }
  }
`
import styled, {css} from 'styled-components'
import {Button} from 'antd'

const commonButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: ${({fontSize}) => fontSize ? fontSize : '16px'};
  font-weight: 500;
  line-height: 16px;
  border-radius: 4px;
  transition: .2s ease;
  color: var(--grey-dwed);
  background-color: transparent;
  border: 1px solid transparent;

  &:hover {
    color: var(--primary-dwed);
  }
`

const primaryButton = css`
  border-radius: var(--basic-border-radius);
  background-color: var(--primary-dwed);
  border: 1px solid var(--primary-dwed);
  color: var(--default-white);

  &:hover {
    border-color: #66C5FF;
    background-color: #66C5FF;
    color: var(--default-white);
  }
`

const dangerButton = css`
  background-color: var(--danger-dwed);
  border-color: var(--danger-dwed);
  border: 1px solid var(--danger-dwed);
  color: var(--default-white);

  &:hover {
    background-color: var(--default-white);
    border-color: var(--danger-dwed);
    color: var(--danger-dwed);
  }
`

const linkButton = css`
  background-color: transparent;
  border-color: transparent;
  color: var(--grey-dwed);
  box-shadow: unset;
`

const outlinedButton = css`
  background: var(--default-white);
  border: 1px solid var(--primary-dwed);
  color: var(--primary-dwed);
`

const buttonStyle = {
    default: commonButton,
    primary: primaryButton,
    danger: dangerButton,
    link: linkButton,
    outlined: outlinedButton
}

const getHeight = ({size}) => {
    switch (size) {
        case ('sm' || 'SM'):
            return 24
        case ('m' || 'M'):
            return 32
        case ('l' || 'L'):
            return 50
        case ('lg' || 'LG'):
            return 48
        default:
            return 32
    }
    
}

const getPadding = ({size}) => {
    switch (size) {
        case ('sm' || 'SM'):
            return '0 12px'
        case ('m' || 'M'):
            return '0 24px'
        case ('l' || 'L'):
            return '0 32px'
        case('lg' || 'LG'):
            return '0 96px'
        default:
            return '0 12px'
    }
}

const getButtonStyle = ({variant}) => {
    return variant ? buttonStyle[variant] : buttonStyle['default']
}

export const StyledButton = styled(Button)`
  && {
    ${commonButton};
    height: ${getHeight}px;
    padding: ${getPadding};
    ${getButtonStyle};

    &:disabled {
      background: #f2f2f2;
      color: rgba(38, 38, 38, .5);
      border-color: #f2f2f2;
    }
  }
`
import styled from 'styled-components'
import {StyledButton} from '../../Button/style'

export const OverlaySignUpWrapper = styled.div`

  .sign-up-btn-wrapper {
    ${StyledButton} {
      height: 50px;
      border: 1px solid var(--primary-dwed);
      color: var(--primary-dwed);
    }
  }

  ${StyledButton} {
    height: 50px;
    width: 100%;
  }

  .auth-wrapper {
    .MuiFilledInput-root {
      height: 50px !important;
    }
  }
`
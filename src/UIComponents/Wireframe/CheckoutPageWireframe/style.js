import styled from 'styled-components'
import {StyledButton} from '../../Button/style'

export const CheckoutPageWireframeWrapper = styled.div`
  padding-bottom: 100px;
  position: relative;
`

export const LinkWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 12px;
  z-index: 1000;
  background: var(--default-white);
  box-shadow: 0px -2px 10px rgba(38, 38, 38, 0.25);

  ${StyledButton} {
    margin: 12px 0;
    height: 50px;
    font-size: 18px;
    line-height: 19px;
    width: 100%;
  }
`
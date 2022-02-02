import styled from 'styled-components'
import {StyledText} from '../../../UIComponents/Typography/style'

export const CardWrapper = styled.div`
  border-radius: var(--basic-border-radius);
  background-color: var(--default-white);
  //box-shadow: var(--basic-shadow);
  padding: 12px;
`

export const ShortInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SubscribeWrapper = styled.div`
  cursor: pointer;
  z-index: 100;

  ${StyledText} {
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-dwed);
  }
`
import styled from 'styled-components'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'

export const OrderCartWrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
  background: ${({background}) => background ? background : '#FFF'};

  .card-header {
    padding: 8px 12px;
  }

  .card-bottom {
    display: flex;
    padding: 8px 12px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--input-border-color);

    ${StyledText} {
      color: var(--primary-dwed);
    }
  }

  ${StyledText} {
    font-size: 14px;
    line-height: 19px;
  }

  ${StyledTitle} {
    font-size: 16px;
    line-height: 19px;
  }
`
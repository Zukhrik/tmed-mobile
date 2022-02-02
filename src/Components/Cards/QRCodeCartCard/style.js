import styled from 'styled-components'
import {CardWrapInfo} from '../ShortCard/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'


export const QRCodeCartCardWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
  border-radius: 6px;

  .padding {
    padding: 12px;
  }

  .bottom-border {
    border-bottom: 1px solid #F2F2F2;
  }

  .card-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${CardWrapInfo} {
      ${StyledTitle} {
        line-height: 13px;
        font-size: 12px;
      }

      ${StyledText} {
        line-height: 13px;
      }
    }
  }

  .time-item-wrapper {
    margin-left: 4px;
    border-radius: 4px;
    padding: 7px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: var(--basic-grey-bg);
  }
`
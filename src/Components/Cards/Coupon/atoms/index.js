import styled from 'styled-components'
import {StyledText, StyledTitle} from '../../../../UIComponents/Typography/style'

export const CouponCardItemWrapper = styled.div`
  min-width: 350px;
  height: 165px;
  border-radius: 6px;
  overflow: hidden;
  color: ${({color}) => color ? color : '#ccc'};

  svg {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .coupon-info-wrapper {
    position: absolute;
    top: 16px;
    bottom: 16px;
    right: 16px;
    left: 16px;

    ${StyledTitle} {
      color: var(--default-white);
      font-size: 40px;
    }

    ${StyledText} {
      color: var(--default-white);
      font-size: 13px;
      line-height: 16px;
    }

    .title {
      ${StyledText} {
        font-size: 17px;
        line-height: 20px;
      }
    }
  }
`
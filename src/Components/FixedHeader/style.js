import styled from 'styled-components'
import {StyledTitle} from '../../UIComponents/Typography/style'
import {IconBox} from '../../UIComponents/GlobalStyles'

export const FixedHeaderWrapper = styled.div`
  position: fixed;
  top: ${({top}) => top ? top : '0'};
  left: 0;
  right: 0;
  height: ${({height}) => height ? height : '50px'};
  border-bottom: ${({hideBorder}) => hideBorder ? 0 : '0.5px solid #F2F2F2'};
  display: flex;
  align-items: center;
  z-index: 14;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FixedHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${IconBox} {
    color: var(--dark-dwed);
    margin-right: 12px;
    width: 28px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${StyledTitle} {
    font-size: 16px;
    font-weight: 500;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`

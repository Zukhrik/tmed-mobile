import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {CardImgWrapper, CardWrapInfo} from '../ShortCard/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'

export const OffersInfoWrapper = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  background: ${({bgColor}) => bgColor ? bgColor : 'var(--default-white)'};
  border-radius: 8px;
  border: 1px solid #F2F2F2;
  overflow: hidden;
  position: relative;

  img {
    height: 150px;
    width: 100%;
  }
`

export const ActionLinksWrapper = styled.div`
  width: 100%;
  padding: 12px 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  //border-bottom: 1px solid #F2F2F2;
  //border-right: 1px solid #F2F2F2;
  //border-left: 1px solid #F2F2F2;
`

export const InfoTextWrapper = styled.div`
  color: var(--dark-dwed);
  line-height: 1.2;

  ${StyledTitle} {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-height: 20px;
    -webkit-line-clamp: 2;
    font-weight: 400;
  }

  ${StyledText} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-left: 10px;
  }
`

export const ProductOwnerWrapper = styled(Link)`
  display: block;
  margin-top: var(--basic-border-radius);

  ${CardImgWrapper} {
    margin: 0 8px 0 0;
  }

  ${CardWrapInfo} {
    span {
      color: var(--grey-dwed);
    }

    ${StyledTitle} {
      font-weight: 500;
      font-size: 12px;
    }
  }
`

export const ProductCostActionWrapper = styled.div`
  display: flex;
  margin-top: var(--basic-border-radius);
  align-items: center;
  justify-content: space-between;

  ${StyledTitle} {
    color: ${({costColor}) => costColor ? costColor : ''};
    font-weight: 700;
    text-transform: uppercase;
  }

  ${IconBox} {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`
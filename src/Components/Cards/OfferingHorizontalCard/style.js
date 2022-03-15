import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText} from '../../../UIComponents/Typography/style'

export const OfferingHorizontalCardWrapper = styled.div`
  position: relative;
  border-radius: 6px;
  background: #FFFFFF;
  height: 95px;
  width: 100%;
  overflow: hidden;
  border: 1px solid #F8F8F8;

  img {
    border-radius: 6px;
    object-fit: cover;
  }

  ${StyledText} {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  ${IconBox} {
    border-radius: 50%;
    width: 24px;
    height: 24px;

    svg {
      width: 24px;
      padding: 6px;
      height: 24px;
    }
  }

  .offer-info-wrapper {
    padding: 12px;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const OfferNameActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const CostManageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
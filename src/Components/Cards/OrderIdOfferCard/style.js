import styled from 'styled-components'
import {StyledTitle} from '../../../UIComponents/Typography/style'

export const OrderOfferIdCardWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(29, 161, 242, 0.1);

  img {
    border-radius: 8px 0 0 8px;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  ${StyledTitle} {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  }

  .offer-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
  }
`

export const ProductCharacteristics = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--grey-dwed);
`
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
  //box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);
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
    border: 1px solid transparent;
    border-radius: 50%;
    color: var(--default-white);
    background: var(--grey-dwed);
    position: absolute;
    width: 24px;
    height: 24px;
    top: 8px;
    z-index: 1;
    left: 8px;

    svg {
      width: 24px;
      height: 24px;
      padding: 4px;
    }
  }

  .offer-info-wrapper {
    padding: 12px;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cost-manage-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const CloseButtonWrapper = styled.div`
  margin: 12px;

  svg {
    width: 30px;
    height: 30px;
  }
`
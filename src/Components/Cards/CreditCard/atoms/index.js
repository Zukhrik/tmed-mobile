import styled from 'styled-components'
import {IconBox} from '../../../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../../../UIComponents/Typography/style'

export const CreditCardItemWrapper = styled.div`
  padding: 16px;
  height: 200px;
  position: relative;
  border-radius: 13px;
  background-image: ${({bgImage}) => bgImage ? `url(${bgImage})` : 'none'};
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 350px;

  ${IconBox} {
    position: absolute;
    top: 16px;
    right: 16px;
    color: var(--default-white);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const NotValidCardWrapper = styled.div`
  background: rgba(38, 38, 38, 0.8);
  overflow-y: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 13px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  ${StyledText} {
    color: var(--default-white);
    font-size: 19px;
  }
`

export const CardTypeItem = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--default-white);
  border-radius: 8px;
  height: 36px;
  width: 36px;

  svg {
    width: auto;
    height: auto;
  }
`

export const CardItemInfoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  ${StyledTitle} {
    font-size: 24px;
    line-height: 29px;
    color: var(--default-white);
  }

  ${StyledText} {
    margin-top: 8px;
    font-size: 16px;
    color: var(--default-white);
  }
`

export const CardNumberAndExpireDateWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${StyledText} {
    line-height: 22px;
    font-size: 18px;
    color: var(--default-white);
  }
`
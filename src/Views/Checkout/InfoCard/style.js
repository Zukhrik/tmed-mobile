import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {StyledButton} from '../../../UIComponents/Button/style'

export const SpecDateWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const SpecDateItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 76px;
  height: 86px;
  border-radius: 6px;
  background-color: var(--basic-grey-bg);
  color: var(--grey-dwed);

  ${StyledTitle} {
    color: var(--dark-dwed);
  }

  ${StyledText} {
    color: var(--dark-dwed);
    font-family: var(--regular-text);
  }

  &:hover,
  &.active {
    background-color: var(--primary-dwed);

    ${StyledTitle},
    ${StyledText} {
      color: #fff;
    }
  }
`

export const MeetTimeItem = styled(NavLink)`
  display: block;
  margin-bottom: 12px;
  border-radius: 6px;
  background-color: var(--basic-grey-bg);
  width: 75px;
  height: 50px;
  font-family: var(--medium-text);

  &:hover,
  &.active {
    background-color: var(--primary-dwed);

    ${StyledTitle} {
      color: #fff;
    }
  }

  ${StyledTitle} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const MeetTimeUIBox = styled.div`
  margin-bottom: 12px;
  border-radius: 6px;
  background-color: var(--basic-grey-bg);
  width: 75px;
  height: 50px;
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  ${StyledTitle} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const PaymentMethodsWrapper = styled.div`
  text-align: justify;

  svg {
    margin-right: 8px;
  }

  && {
    .ant-radio-inner {
      width: 20px;
      height: 20px;
    }

    .ant-radio-group {
      width: 100%;
    }

    span.ant-radio + * {
      display: flex;
      width: 100%;
      padding-right: 0;
    }

    .ant-space-vertical {
      width: 100%;
    }

    label {
      font-size: 15px;
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 0;
    }

    .ant-radio {
      top: 0;
    }

    .ant-radio-inner:after {
      width: 12px;
      height: 12px;
    }

    .ant-radio-checked::after {
      border: 1px solid var(--primary-dwed);
    }

    .ant-radio-inner::after {
      background-color: var(--primary-dwed);
    }
  }
`

export const CardInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const VerifyCardLink = styled.span`
  color: var(--primary-dwed);
  font-size: 15px;
  font-weight: 400;
`

export const CheckoutDetailWrapper = styled.div`

  .payment-icon-wrapper {
    transition: .2s ease;
  }

  .radio-wrapper {
    padding: 0 12px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
  }

  .select-card-wrapper {
    ${StyledTitle} {
      font-size: 16px;
      line-height: 18px;
    }

    .ant-space-item {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .plus-svg {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--grey-dwed);

      svg {
        width: 36px;
        height: 36px;
      }
    }
  }

  ${StyledTitle} {
    font-size: 17px;
  }
`

export const CreditCardDetailForm = styled.form`
  width: 100%;

  ${StyledButton} {
    width: 100%;
    margin-top: 12px;
  }
`
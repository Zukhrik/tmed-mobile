import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'

export const InfoCartWrapper = styled.div`
  height: 66px;
  padding: 12px;
  border-radius: 6px;
  background: var(--default-white);
  box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);

  ${StyledText} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    span {
      color: var(--grey-dwed);
      font-size: 16px;
      line-height: 20px;
    }
  }

  ${IconBox} {
    color: var(--primary-dwed);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const CheckoutModalWrapper = styled.div`
  min-height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;

  ${StyledTitle} {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  ${StyledText} {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: var(--grey-dwed);
  }
`

export const ModalSubmitButton = styled.div`
  width: 100%;
  height: 50px;
  background: var(--primary-dwed);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;

  .ant-modal-body {
    padding: 0;

    @media (max-width: 576px) {
      padding: 0;
    }
  }

  ${StyledText} {
    color: var(--default-white);
    font-size: 16px;
    line-height: 19px;
  }
`

export const MeetingTimeCardWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 6px;
  background: var(--default-white);
  box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);
  position: relative;

  .calendar {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  ${StyledTitle} {
    color: var(--grey-dwed);
    font-size: 20px;
  }
`

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SpecialistWorkingTimeWrapper = styled.div`

  ${StyledText} {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: var(--dark-dwed);
  }

  ${IconBox} {
    border-radius: 50%;
    background: var(--primary-dwed);
    color: var(--default-white);

    svg {
      margin: 13px;
      width: 24px;
      height: 24px;
    }
  }
`
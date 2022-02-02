import {Statistic} from 'antd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {StyledButton} from '../../UIComponents/Button/style'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'

const {Countdown} = Statistic

export const SignInWrapper = styled.div`
  && {
    .ant-modal-mask {
      background: var(--default-white);
    }
  }
`

export const AuthContainer = styled.div`
  background: var(--primary-dwed);
  width: 100%;
  display: flex;
  min-height: ${({height}) => (height ? height : '100vh')};
  align-items: center;
  justify-content: ${({justify}) => (justify ? justify : 'center')};
  flex-direction: column;

  @media (max-width: 576px) {
    align-items: unset;
    background-color: #fff;
  }
`

export const AuthCloseBtnWrap = styled(Link)`
  position: absolute;
  color: var(--default-white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 100%;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 576px) {
    color: var(--dark-dwed);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const ImageWrapper = styled.div`
  color: var(--primary-dwed);
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  ${StyledTitle} {
    color: var(--default-white);
    margin: 20px 0 50px 0;
    font-size: 18px;
    font-weight: 500;

    @media (min-width: 576px) {
      color: var(--dark-dwed);
    }
  }

  @media (min-width: 576px) {
    color: var(--default-white);
  }

  @media (min-width: 1024px) {
    color: var(--default-white);
  }

  svg {
    width: 129px;
    height: 48px;

    @media (min-width: 1024px) {
      width: 180px;
      height: 70px;
    }
  }
`

export const AuthForm = styled.form`
  padding: 36px;
  background-color: var(--default-white);
  border-radius: var(--basic-border-radius);
  max-width: 432px;
  width: 100%;
  position: ${({position}) => position ? position : ''};

  .fast-auth-title {
    font-weight: 700;
    font-size: 28px;
    font-family: "Golos", sans-serif;
    text-align: center;
  }

  .fast-auth-label {
    font-family: "Golos", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--grey-dwed);
    text-align: center;
  }

  .fast-auth-input-wrapper {
    margin-top: 16px;
  }

  .fast-auth-btn-wrapper {
    ${StyledButton} {
      margin-top: 24px;
    }
  }

  .container {
    padding: 0 12px;
  }

  .auth-form-label {
    padding: 0 12px;
    margin-top: 12px;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;

    ${StyledText} {
      font-size: 11px;
    }
  }

  @media (max-width: 576px) {
    max-width: unset;
    width: unset;
    padding: 0;
  }

  ${StyledButton} {
    width: 100%;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 0;

    svg {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }

  ${StyledTitle} {
    font-size: 18px;
  }
`

export const CloseModalForm = styled.div`
  @media (width: 1080px) {
    position: absolute;
    top: 12px;
    right: 12px;
    color: var(--dark-dwed);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const ConfirmButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const AuthAction = styled.div`
  display: flex;
  justify-content: ${({justifyContent}) =>
          justifyContent ? justifyContent : 'unset'};
  padding: 0 12px;

  input {
    margin-right: 15px;
  }

  a {
    color: var(--primary-dwed);
    text-decoration: underline;
  }

  .ant-checkbox-wrapper {
    font-size: 12px;
  }

  ${StyledText} {
    color: var(--primary-dwed);
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`

export const LinkToWrapper = styled.div`
  color: var(--default-white);
  text-align: center;
  margin-top: ${({marginTop}) => (marginTop ? marginTop : '')};

  ${StyledText} {
    color: var(--dark-dwed);
    font-size: 14px;
    margin: 30px 0;

    @media (min-width: 576px) {
      color: var(--default-white);
    }
  }

  @media (max-width: 576px) {
    color: var(--primary-dwed);
  }

  a {
    color: var(--default-white);
    text-decoration: underline;

    @media (max-width: 576px) {
      color: var(--primary-dwed);

      ${StyledText} {
        color: var(--dark-dwed);
      }
    }
  }
`

export const CountdownWrapper = styled.div`
  color: #2c2c2e;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-size: 12px;
  padding: ${({padding}) => (padding ? padding : '0 12px')};
`

export const StyledCountdown = styled(Countdown)`
  && {
    display: inline;

    .ant-statistic-content {
      display: inline;
      font-size: 14px;
      font-weight: 500;
    }
  }
`

export const FastAuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${StyledButton} {
    width: 100%;
    height: 50px;
  }

  .ant-modal-close {
    @media (width: 1080px) {
      display: none;
    }
  }

  @media (width: 1080px) {
    background: var(--primary-dwed);

    ${StyledText} {
      font-size: 16px;
    }
  }

  ${IconBox} {
    position: absolute;
    top: 12px;
    right: 12px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const AccountQRScanWrapper = styled.div`
  border-radius: 6px;
  padding: 36px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 432px;
  height: 353px;
  background: var(--default-white);

  ${IconBox} {
    position: absolute;
    top: 12px;
    right: 12px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${StyledTitle} {
    font-size: 18px;
    margin-bottom: 12px;
  }
`

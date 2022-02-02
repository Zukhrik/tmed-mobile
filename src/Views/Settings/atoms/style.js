import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledButton} from '../../../UIComponents/Button/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'

export const SettingsContentWrapper = styled.div`
  padding: 0 12px;
  //margin-top: 12px;

  ${StyledText} {
    font-size: 16px;
    line-height: 24px;
  }

  ${StyledButton} {
    width: 100%;
  }

  && {

    .MuiButton-root {
      text-transform: none;
    }

    .MuiButtonGroup-root {
      width: 100%;
    }

    .ant-select {
      width: 100%;

      .ant-select-selector {
        border-color: var(--grey-border);
        background: var(--basic-grey-bg);
        height: 50px;
      }

      .ant-select-arrow {
        display: none;
      }
    }

    .ant-select-single .ant-select-selector .ant-select-selection-item,
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
      line-height: 46px;
      font-size: 14px;
    }
  }
`

export const SettingLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--dark-dwed);

  svg {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`

export const LanguagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  width: 100%;

  ${StyledText} {
    font-size: 16px;
  }

  .current-lang {
    ${StyledText} {
      font-size: 14px;
      color: var(--grey-dwed);
    }
  }
`

export const PaymentBodyWrapper = styled.div`
  .payment-wrapper {
    padding-bottom: 60px;
  }

  .payment-title {
    ${StyledText} {
      color: var(--grey-dwed);
      font-size: 13px;
    }
  }

  .payment-item {
    ${StyledText} {
      font-size: 15px;
    }
  }

  .payment-text {
    ${StyledText} {
      font-size: 11px;
    }
  }

  ${IconBox} {
    font-size: 13px;
    font-family: var(--medium-text);
    color: var(--primary-dwed);

    svg {
      margin-right: 4px;
      width: 16px;
      height: 16px;
    }
  }
`

export const ChangeCardForm = styled.form`
  ${StyledTitle} {
    font-size: 18px;
    line-height: 22px;
  }
`
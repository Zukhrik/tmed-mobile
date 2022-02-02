import styled from 'styled-components'
import {CardWrapInfo} from '../../../Components/Cards/ShortCard/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {InputIcon, StyledInput} from '../../../UIComponents/Inputs/style'

export const AccountSettingsWrapper = styled.div`
  .linked-users-title {
    color: var(--grey-dwed);
    font-family: var(--regular-text);
    font-size: 12px;
    text-align: left;
  }

  .add-account-wrapper {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: var(--medium-text);

    svg {
      color: var(--grey-dwed);
      margin-right: 12px;
    }
  }

  .logout {
    color: var(--danger-dwed);
  }

  ${CardWrapInfo} {
    ${StyledText} {
      font-size: 12px;
    }
  }
`

export const AccountFallsFixedHeaderWrapper = styled.div`
  .padding-x {
    padding: 12px 0;
  }

  .links {
    color: var(--grey-dwed);
    font-family: var(--regular-text);
    font-size: 16px;
    padding: 12px 0;
    text-align: center;

    &.active {
      color: var(--primary-dwed);
      border-bottom: 1px solid var(--primary-dwed);
    }
  }
`

export const FollsListWrapper = styled.div`
  padding: 0 12px;

  ${CardWrapInfo} {
    ${StyledTitle} {
      font-size: 14px;
      font-family: var(--regular-text);
    }

    ${StyledText} {
      font-size: 12px;
    }
  }
`

export const SearchInputWrapper = styled.form`

  ${StyledInput} {
    background: var(--basic-grey-bg);
  }

  ${InputIcon} {

    svg {
      width: 14px;
      height: 14px;
    }
  }
`
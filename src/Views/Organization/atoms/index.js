import styled from 'styled-components'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {StyledButton} from '../../../UIComponents/Button/style'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const AccountInfoWrap = styled.div`
  background: var(--default-white);

  .padding {
    padding: 0 12px;
    width: 100%;
  }

  .short-info-wrapper {
    padding: 0 12px;

    ${StyledTitle} {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    ${StyledText} {
      color: var(--grey-dwed);
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .subs-button-wrapper {
    margin: 12px 0;
    padding: 0 12px;
    color: var(--primary-dwed);

    ${StyledButton} {
      width: 100%;
      height: 30px;
      font-size: 13px;
      font-family: var(--medium-text);
      line-height: 16px;
    }
  }

  .account-subs-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--medium-text);
    font-size: 15px;
    justify-content: space-between;
    height: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const FilterPanelWrapper = styled.div`
  padding: 0 12px;

  ${IconBox} {

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const FilterSearchPanel = styled.input`
  height: 30px;
  padding: 12px;
  width: 100%;
  background: var(--basic-grey-bg);
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 12px;
  color: var(--dark-dwed);

  &::placeholder {
    color: var(--grey-dwed);
    font-size: 12px;
  }
`

export const SearchPanelForm = styled.form`
  display: flex;
  position: relative;

  ${IconBox} {
    position: absolute;
    right: 0;
    height: 100%;
    color: var(--grey-dwed);

    svg {
      width: 14px;
      height: 14px;
      margin-right: 12px;
    }
  }
`
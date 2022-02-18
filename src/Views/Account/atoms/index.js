import styled from 'styled-components'
import {InputIcon, StyledInput} from '../../../UIComponents/Inputs/style'
import {StyledText} from '../../../UIComponents/Typography/style'

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

export const AccountInfoWrapper = styled.div`
  box-shadow: 0 4px 24px rgba(38, 38, 38, 0.04);
  padding: 12px;

  .avatar {
    display: flex;
    justify-content: center;
  }

  .about-account {
    text-align: center;

    ${StyledText} {
      color: var(--grey-dwed);
    }
  }
`

export const AccountBlockItems = styled.div`
  box-shadow: 0 4px 24px rgba(38, 38, 38, 0.04);
  padding: 12px;

  .item-description {
    color: var(--grey-dwed);
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const AboutMeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0 12px;

  .item-name {
    color: var(--grey-dwed);
  }
`

export const RecordsCardWrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
  padding: 12px;

  .offering-name {
    font-size: 14px;
    font-family: var(--regular-text);
  }

  .meet-time {
    color: var(--grey-dwed);
    font-size: 12px;
    font-family: var(--regular-text);
  }
`
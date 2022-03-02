import styled from 'styled-components'
import {InputIcon, StyledInput} from '../../../UIComponents/Inputs/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {ShortCardContainer} from '../../../Components/Cards/ShortCard/style'
import {IconBox} from '../../../UIComponents/GlobalStyles'

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

export const AccountHeaderWrapper = styled.div`
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

export const AboutAccountWrapper = styled.form`
  padding: 0 12px;

  .change-photo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${IconBox} {
      border-radius: 50%;
      background: #f2f2f2;
      width: 96px;
      height: 96px;

      svg {
        width: 44px;
        height: 44px;
      }
    }
  }
  
  .padding-bottom {
    padding-bottom: 65px;
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

  ${ShortCardContainer} {
    ${StyledTitle} {
      font-family: var(--regular-text);
    }
  }
`
import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'

export const FamousCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--grey-border);
  border-radius: var(--basic-border-radius);
  position: relative;
  height: 250px;
  min-width: 165px;
  padding: 12px;

  ${IconBox} {
    color: var(--grey-dwed);
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    background-color: var(--default-white);
    cursor: pointer;

    &.active {
      background-color: var(--primary-dwed);

      svg {
        color: var(--default-white);
      }
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const AccountInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${StyledTitle} {
    text-align: center;
    margin-top: 4px;

    &.account-suggestion-fullname {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;

      span {
        display: inline-block;
      }
    }
  }

  ${StyledText} {
    text-align: center;
    color: var(--grey-dwed);

    &.account-suggestion-category {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        display: inline-block;
      }
    }
  }
`

export const SubscribeWrapper = styled.div`
  width: 100%;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'var(--primary-dwed)'};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
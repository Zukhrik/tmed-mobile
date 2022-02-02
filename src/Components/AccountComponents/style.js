import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {StyledButton} from '../../UIComponents/Button/style'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'


export const AccountInfoWrap = styled.div`
  background: var(--default-white);

  .padding {
    padding: 12px;
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

export const AccountHeaderActionsWrapper = styled.div`
  display: flex;

  ${StyledButton} {
    margin-left: 24px;
  }
`

export const LangWrapper = styled.div`
  display: flex;
  font-size: 16px;

  ${IconBox} {

    svg {
      width: 32px;
      height: 32px;
    }
  }

  .lang-wrapper {
    margin-right: 24px;
    display: flex;
    align-items: center;
    padding: 5px 12px;

    svg {
      margin-left: 8px;
      width: 24px;
      height: 24px;
    }
  }
`

export const UserOfferingsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

export const ActionWrapper = styled.div`
  z-index: 101;
`

export const ActionPlusWrapper = styled.div`
  background-color: var(--primary-dwed);
  border-radius: 50%;
  position: fixed;
  bottom: 71px;
  right: 16px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 102;
  color: var(--default-white);
  transition: .2s ease;
  box-shadow: ${({active}) => active ? '0 2px 11px rgba(129, 202, 248, 0.24)' : 'none'};
  transform: ${({active}) => active ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)'};

  svg {
    margin: 15px;
    height: 27px;
    width: 27px;
  }
`

export const PopUpWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(17, 19, 23, 0.8);
  transition: .2s ease;
`

export const PopUpInner = styled.div`
  position: absolute;
  right: 24px;
  bottom: 142px;
`

export const PopUpButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
`

export const LinkWrapper = styled.div`
  display: flex;
  margin-top: 18px;
  align-items: center;
  justify-content: center;

  ${StyledText} {
    color: #fff;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    margin-right: 10px;
  }

  ${IconBox} {
    background-color: var(--default-white);
    border-radius: 50%;

    svg {
      width: 24px;
      height: 24px;
      margin: 8px;
    }
  }
`

export const UserPageBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const AccountGroupSkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const InfoInFixedHeaderWrapper = styled.div`
  .title-wrapper {
    ${StyledTitle} {
      display: -webkit-box;
      overflow: hidden;
      font-size: 16px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .shopping-bag-wrapper {
    ${IconBox} {
      position: relative;
    }
  }
`

export const CartCountIndicator = styled.span`
  width: 12px;
  height: 12px;
  background: var(--danger-dwed);
  color: var(--default-white);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 6px;
  font-family: var(--medium-text);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

export const UserBodyLinkWrapper = styled(NavLink)`
  display: block;
  font-weight: 400;
  line-height: 16px;
  color: var(--grey-dwed);
  font-size: 13px;
  text-align: center;
  background: var(--default-white);

  &.active {
    color: var(--primary-dwed);
    border-bottom: ${({border_bottom}) => border_bottom ? border_bottom : ''};

    ${IconBox} {
      color: var(--primary-dwed);
    }

    ${StyledButton} {
      color: var(--primary-dwed);
    }

    &.title::after {
      content: "";
      display: block;
      margin: 0 auto;
      border-bottom: 1px solid var(--primary-dwed);
    }
  }

  ${StyledButton} {
    width: 100%;
    text-align: center;
    color: var(--grey-dwed);
    font-weight: 400;
    height: 40px;
    padding: 0;

    ${IconBox} {
      background: var(--default-white);
      margin-right: 4px;

      svg {
        width: 16px;
        height: 16px;
      }

      &.active {
        color: var(--primary-dwed);
      }
    }

    &.active {
      color: var(--primary-dwed);
    }
  }
`
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {StyledButton} from '../../UIComponents/Button/style'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${StyledTitle} {
    margin-top: 24px;
  }
`

export const HeaderLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
  align-items: center;
  justify-content: space-around;
`

export const HeaderLinksItem = styled(NavLink)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.15px;
  color: var(--dark-dwed);

  &::after {
    width: 0;
    content: '';
    height: 2px;
    display: block;
    align-items: center;
    transition: width .2s;
    justify-content: center;
    background-color: var(--primary-dwed);
  }

  a.active:focus a.active:active {
    color: var(--dark-dwed);
  }

  &.active:after {
    width: 100%;
    transition: width .5s;
    align-items: center;
    color: var(--primary-dwed);
  }
`

export const UserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 60px;

  ${StyledTitle} {
    margin-top: 14px;
  }
`

export const UserWorkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${StyledButton} {
    margin-top: 20px;
  }
`

export const UserAvatarSliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 54px;

  ${IconBox} {
    background-color: var(--input-border-color);
    border-radius: 50%;
    height: 124px;
    width: 124px;
    cursor: pointer;
    margin: var(--basic-border-radius);

    svg {
      height: 24px;
      width: 24px;
    }
  }
`

export const SliderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const UserActivationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--grey-dwed);
  margin-bottom: 24px;

  ${IconBox} {
    cursor: pointer;

    ${StyledText} {
      color: #FF0000;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.25px;
    }

    svg {
      height: 24px;
      width: 24px;
    }
  }

  ${StyledButton} {
    margin-top: 8px;
    padding: 12px;
  }
`

export const VerifyInfoPopUp = styled.div`
  background: rgba(17, 19, 23, 0.8);
  position: fixed;
  z-index: 101;
  margin: auto;
  height: 100%;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`

export const VerifyPopUpInner = styled.div`
  ${StyledButton} {
    min-width: 140px;
    max-width: 140px;
    margin: 8px 0;
  }
`

export const PopUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 0;
`

export const PopUpInfoP = styled.p`
  color: var(--grey-dwed);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25px;
`

export const PopUpInfoUl = styled.ul`
  color: var(--dark-dwed);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25px;
  padding-left: 0;
`

export const PopUpInfoLi = styled.li`
  list-style: none;
`

export const ProfileMenuLink = styled(StyledButton)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${IconBox} {
    color: var(--default-white);
    cursor: pointer;
  }

  svg {
    height: 76px;
    width: 76px;
  }
`

export const LogOutButtonWrapper = styled.div`
  width: 100%;
  background: var(--primary-dwed);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${StyledText}{
    color: var(--default-white);
    font-size: 16px;
  }
`
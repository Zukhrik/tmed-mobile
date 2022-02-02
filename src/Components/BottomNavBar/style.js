import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../UIComponents/GlobalStyles'

export const BottomNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid var(--grey-border);
  background-color: var(--default-white);
  box-shadow: 0 6px 12px rgb(0 0 0 / 25%);
  z-index: 1000;
  transition: 0.3s linear;

  &.hide {
    width: 100%;
    position: fixed;
    bottom: -60px;
    transition: 0.3s linear;
  }
`

export const NavLinkWrapper = styled.div`
  //color: var(--default-white);
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const NavLinkItem = styled(NavLink)`
  width: calc(100% / 5);
  color: var(--grey-dwed);
  padding: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: var(--bottom-navbar-height);

  svg {
    width: 24px;
    height: 24px;
  }

  @media (width: 1080px) {
    margin: 24px 0;
    svg {
      width: 36px;
      height: 36px;
    }
  }

  ${IconBox} {
    position: relative;
    color: var(--grey-dwed);
  }

  &.active {
    color: var(--primary-dwed);

    svg {
      color: var(--primary-dwed)
    }
  }
`
export const BottomNavbarItem = styled.div`
  width: calc(100% / 5);
  color: var(--grey-dwed);
  padding: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: var(--bottom-navbar-height);

  svg {
    width: 24px;
    height: 24px;
  }

  @media (width: 1080px) {
    margin: 24px 0;
    svg {
      width: 36px;
      height: 36px;
    }
  }

  ${IconBox} {
    position: relative;

    @media (width: 1080px) {
      svg {
        width: 36px;
        height: 36px;
      }
    }
  }
`

export const BottomNavbarCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  line-height: 1;
  padding: 3px 4px 2px 4px;
  border-radius: 50%;
  color: #fff;
  background: #FF3B30;
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 11px;
`
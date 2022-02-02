import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-dwed);
  margin-bottom: 64px;

  svg {
    width: 101px;
    height: 109px;
  }
`

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 50%;
  z-index: 1000;
  margin: 0 auto;
  background-color: #fff;
  transition: .2s ease all;
  transform: translateX(-50%);
  box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);
  top: 0;
  height: ${({height}) => height ? height : '100px'};

  @media (max-width: 992px) {
    max-width: 100%;
  }
`

export const ActiveIconsWrapper = styled.div`
  color: var(--icon-color);
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  svg {
    margin-left: 20px;
    cursor: pointer;
  }

  svg:active {
    color: var(--primary-dwed);
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  height: 89px;
  flex-direction: column;
  padding: 16px 12px 0 12px;
  border-bottom: 1px solid #F2F2F2;
`

export const SearchInputForm = styled.form`
  width: 100%;
  position: relative;
  padding: ${({paddingInput}) => paddingInput ? '0 8px' : 0};

  ${IconBox} {
    left: 8px;
    bottom: 7px;
    position: absolute;
    color: var(--grey-dwed);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const SearchInput = styled.input`
  border: 0;
  width: 100%;
  height: 30px;
  border-radius: 6px;
  padding-left: 32px;
  font-size: 13px;
  background: rgba(242, 242, 242, 0.5);

  &::placeholder {
    color: var(--grey-dwed);
  }

  &:focus {
    border: none;
    outline: none;
  }
`

export const SearchNavLink = styled(NavLink)`
  color: var(--grey-dwed);
  letter-spacing: 0.25px;
  padding: 12px 0;
  line-height: 1.2;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    color: var(--primary-dwed);
    border-bottom: 1px solid var(--primary-dwed);
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`

export const CategoriesWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  padding: 12px 0;
  position: relative;
  margin-right: 60px;
`

export const CategoriesItem = styled.div`
  margin-right: 12px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 11px;
  line-height: 13px;
  color: var(--grey-dwed);
  padding: 5.5px 8px;
  background: var(--basic-grey-bg);
`

export const AllCatsButton = styled.div`
  border: 1px solid var(--primary-dwed);
  border-radius: 6px;
  color: var(--primary-dwed);
  background: var(--default-white);
  position: absolute;
  font-size: 11px;
  line-height: 13px;
  right: 12px;
  max-height: 24px;
  bottom: 12px;
  padding: 5.5px 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${IconBox} {
    color: var(--primary-dwed);
    transition: .2s ease;
    transform: scaleY(${({status}) => status ? -1 : 1});

    svg {
      width: 16px;
      height: 100%;
    }
  }
`
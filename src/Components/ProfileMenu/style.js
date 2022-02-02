import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {ShortCardContainer} from '../Cards/ShortCard/style';

export const MenuHead = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 9px;
  border-bottom: 1px solid var(--grey-border);
  margin-bottom: 31px;
  outline: none;

  ${ShortCardContainer} {
    flex-direction: column;
    align-items: end;
  }
  
  svg {
    cursor: pointer;
  }
`

export const ArrowWrap = styled.span`
  transition: .2s ease;
  transform: scaleY(${({status}) => status ? -1 : 1});
  display: flex;
  align-items: center;
`

export const MenuItemLink = styled(NavLink)`
  margin-bottom: 36px;
  font-size: 18px;
  font-weight: 500;
  display: flex !important;
  align-items: center;
  color: var(--grey-dwed);
  
  svg {
    margin: 0 16px;
  }

  &.active {
    color: var(--primary-dwed)
  }
`

export const AccountsLinkedWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid var(--grey-border);
  color: var(--grey-dwed);
`

export const LinkedWrapTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--basic-border-radius) 0;
  width: 100%;
`

export const LinkedWrapBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AccountData = styled.div`
  padding: 12px 0;
`

export const AccountDataItems = styled.div`
  padding: 6px 0;
`
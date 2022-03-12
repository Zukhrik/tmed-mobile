import styled from 'styled-components';
import {CardWrapInfo} from '../../../Cards/ShortCard/style';

export const ShortCardWrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 18px;
  justify-content: space-between;
  border-bottom: 1px solid var(--input-border-color);
`

export const AccountActionWrap = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: .2s ease;
  justify-content: space-between;
  transform: scaleY(${({status}) => status ? -1 : 1});
`

export const ListWrap = styled.div`
  display: flex;
  padding: 24px 0;
  color: var(--grey-dwed);
  justify-content: space-around;
  border-bottom: 1px solid var(--input-border-color);

  ${CardWrapInfo} {
    display: flex;
    margin-top: 8px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  span {
    font-size: 16px;
    padding: 4px 0;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {CardImgWrapper, CardWrapInfo} from '../../Cards/ShortCard/style'

export const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const SpecialistNavLink = styled(NavLink)`
  border: 1.5px solid transparent;
  border-radius: 6px;

  &.active {
    border: 1.5px solid var(--primary-dwed);
  }

  ${CardImgWrapper} {
    margin: 0;
  }


  ${CardWrapInfo} {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    ${StyledText} {
      align-items: center;
      -webkit-line-clamp: 2;
      color: var(--dark-dwed);
      word-break: break-word;
    }

    ${StyledTitle} {
      align-items: center;
      -webkit-line-clamp: 2;
      color: var(--dark-dwed);
      word-break: break-word;
    }
  }
`

export const CategoryItemWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

export const CatItemNavLink = styled(NavLink)`
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.25px;
  text-align: center;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--input-border-color);
  font-size: ${({fontSize}) => fontSize ? fontSize : '14px'};
  color: var(--grey-dwed);
  white-space: nowrap;
  overflow: hidden;
  margin-right: ${({marginright}) => marginright ? marginright : '12px'};
  text-overflow: ellipsis;

  &.active {
    color: var(--default-white);
    background: var(--primary-dwed);
    border-color: var(--primary-dwed);
  }
`

export const OfferGroupWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: auto;

  .centered {
    display: flex;
    justify-content: center;
    align-items: start;
  }
`

export const OfferingGroupSearchForm = styled.form`
  position: fixed;
  width: 95%;
  background: var(--default-white);
  height: 50px;
  z-index: 1;

  input {
    height: 30px;
    padding: 12px;
    width: 100%;
    background: var(--basic-grey-bg);
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 12px;
    color: var(--dark-dwed);
  }

  svg {
    color: var(--grey-dwed);
    width: 16px;
    height: 16px;
    position: absolute;
    right: 12px;
    top: 6px;
  }
`

export const GroupItemNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1.5px solid transparent;

  img {
    width: 100%;
    height: 90px;
    object-fit: cover;
  }

  &.active {
    ${StyledText} {
      color: var(--primary-dwed);
    }
  }

  ${StyledText} {
    margin-top: 8px;
    text-align: center;
    line-height: 1.5;
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
`
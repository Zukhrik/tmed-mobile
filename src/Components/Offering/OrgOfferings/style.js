import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {CardImgWrapper, CardWrapInfo, ShortCardContainer} from '../../Cards/ShortCard/style'

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

  &.active {

    ${CardWrapInfo} {
      ${StyledText} {
        span {
          color: var(--primary-dwed);
        }
      }

      ${StyledTitle} {
        span {
          color: var(--primary-dwed);
        }
      }
    }
  }

  ${ShortCardContainer} {
    margin-right: 32px;
    flex-direction: column;
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
      span {
        align-items: center;
        -webkit-line-clamp: 2;
        letter-spacing: -0.3px;
        color: var(--dark-dwed);
      }
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
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;
  justify-content: flex-start;
  
  .centered {
    display: flex;
    justify-content: center;
  }

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const GroupItemNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${({maxwidth}) => maxwidth ? maxwidth : '75px'};

  img {
    overflow: hidden;
    border-radius: 4px;
    width: 104px;
    height: 84px;
    object-fit: contain;
    border: 3px solid transparent;
  }

  &.active {
    img {
      border: 3px solid var(--primary-dwed);
      border-radius: var(--basic-border-radius);
    }

    .offering-group-name {
      color: var(--primary-dwed);
    }
  }

  ${StyledText} {
    margin-top: 2px;
    text-align: center;
    line-height: 1.5;
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const FilterPanelWrapper = styled.div`
  width: 100%;
  padding: 0 12px;

  ${IconBox} {
    position: absolute;
    right: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const SearchPanelForm = styled.form`
  display: flex;
  position: relative;

  ${IconBox} {
    height: 100%;
    color: var(--grey-dwed);

    svg {
      width: 14px;
      height: 14px;
      margin-right: 12px;
    }
  }
`

export const FilterSearchPanel = styled.input`
  height: 30px;
  padding: 12px;
  width: 100%;
  background: var(--basic-grey-bg);
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 12px;
  color: var(--dark-dwed);

  &::placeholder {
    color: var(--grey-dwed);
    font-size: 12px;
  }
`

export const OfferingGroupItemSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({height}) => height ? height : 'auto'};
`
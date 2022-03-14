import styled from 'styled-components'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {IconBox, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {StyledButton} from '../../../UIComponents/Button/style'
import {NavLink} from 'react-router-dom'
import {CardImgWrapper, CardWrapInfo} from '../../../Components/Cards/ShortCard/style'

export const OfferingPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: ${({paddingTop}) => paddingTop ? paddingTop : '50px'};
  padding-bottom: 60px;

  .media-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`

export const ProductInfoContentWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .padding {
    padding: 0 12px;
  }
`

export const OfferShortInfoWrapper = styled.div`
  .container {
    padding: 0 12px;
  }

  .offering-description {
    ${StyledText} {
      font-size: 16px;
      letter-spacing: 0.4px;
    }

    ${StyledTitle} {
      font-size: 18px;
      line-height: 1;
    }
  }

  .info-bottom-line {
    height: 1px;
    background: #F2F2F2;
  }
`

export const OfferingCreateButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  font-size: 16px;
  z-index: 10;
  box-shadow: 0 -2px 10px rgba(38, 38, 38, 0.25);
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: var(--default-white);

  ${StyledButton} {
    width: 100%;
    height: 48px;
    font-family: var(--medium-text);
  }
`


export const OfferInfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${StyledText} {
    font-size: 14px;
    line-height: 16px;
  }

  ${StyledTitle} {
    line-height: 16px;
  }

  ${SkeletonUI} {
    margin-right: 5px;
  }
`

export const ToBuyWrapper = styled.div`
  ${IconBox} {
    position: absolute;
    right: 16px;
    bottom: 0;
    color: var(--dark-dwed);

    ${SkeletonUI} {
      margin-bottom: 7px;
    }

    &:active {
      color: var(--primary-dwed);
    }

    svg {
      height: 32px;
      width: 32px;
    }
  }
`

export const OfferingColorItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${StyledText} {
    font-weight: 400;
    letter-spacing: 0.25px;
    color: var(--dark-dwed);
  }

  ${IconBox} {
    position: absolute;
    right: 16px;
    color: var(--dark-dwed);

    &:active {
      color: var(--primary-dwed);
    }

    svg {
      height: 32px;
      width: 32px;
    }
  }
`

export const BetweenWrapper = styled.div`
  height: 1px;
  flex-grow: 1;
  margin: 0 10px;
  -webkit-box-flex: 1;
  border: 1px dashed rgb(209 209 192 / 44%);
`

export const OfferingColorItem = styled.div`
  height: 24px;
  width: 24px;
  margin-left: 8px;
  box-shadow: rgb(0 0 0 / 25%) 0 1px 2px;
  border-radius: 50%;
  background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : ''};
`

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${StyledText} {
    color: #939393;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 12px;
  }
`

export const Description = styled.div`
  white-space: pre-wrap;

  ${StyledText} {
    color: var(--dark-dwed);
    letter-spacing: 0.4px;
    font-size: 14px;
    line-height: 16px;
    white-space: pre-wrap;
  }

  span {
    color: var(--primary-dwed);
  }
`

export const PropertyName = styled.div`
  display: flex;
  letter-spacing: 0.25px;

  ${StyledText} {
    color: var(--grey-dwed);
    font-size: 14px;
    line-height: 20px;
  }
`

export const PropertyDescription = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  white-space: nowrap;

  ${StyledText} {
    font-size: 12px;
    letter-spacing: 0.25px;

    ${IconBox} {
      margin-left: 5px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`

export const InfoBottomLineWrapper = styled.div`
  height: 1px;
  width: 100%;
  background: var(--basic-grey-bg);
`

export const CharacsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${StyledText} {
    color: #939393;
    font-size: 14px;
    line-height: 16px;
  }
`

export const CharacteristicsList = styled.div`
  ${StyledText} {
    letter-spacing: 0.4px;
    line-height: 16px;
    text-align: start;
  }

  padding-bottom: 80px;
`

export const ActionArrowWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: .2s ease;
  color: var(--dark-dwed);
  justify-content: space-between;
  transform: scaleY(${({status}) => status ? -1 : 1});
`

export const SpecListWrapper = styled.div`
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
  margin-right: 12px;

  &.active {
    span {
      color: var(--primary-dwed);
    }

    span {
      color: var(--primary-dwed);
    }
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
    }

    ${StyledTitle} {
      align-items: center;
      -webkit-line-clamp: 2;
      color: var(--dark-dwed);
    }
  }
`
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {StyledButton} from '../../../UIComponents/Button/style'
import {StyledAvatar} from '../../../UIComponents/Avatar/style'
import {ShortCardContainer} from '../../../Components/Cards/ShortCard/style'

export const RecordsFixedHeaderComponentWrapper = styled.div`
  .header {
    display: flex;
    align-items: center;
    height: 50px;

    ${IconBox} {
      margin-right: 12px;
    }

    ${StyledTitle} {
      font-size: 16px;
    }
  }

  .scroll-width-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const RecordsNavLink = styled(NavLink)`
  font-family: "Golos", sans-serif;
  font-weight: var(--regular-text);
  font-size: 13px;
  line-height: 15px;
  color: var(--grey-dwed);
  padding: 12px 0;
  margin-right: 24px;
  white-space: nowrap;
  border-bottom: 0.5px solid transparent;
  
  &.active {
    color: var(--primary-dwed);
    border-bottom: 0.5px solid var(--primary-dwed);
  }
`

export const OrderItemContent = styled.div`
  padding: 12px 12px 12px 6px;
`

export const OrderItemDetail = styled.div`
  display: flex;
  align-items: center;

  ${StyledTitle} {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: unset;
    white-space: nowrap;
  }

  ${StyledText} {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey-dwed);
    letter-spacing: unset;
    margin-right: 12px;
  }
`

export const RecordDetailWrapper = styled.div`
  position: relative;

  ${IconBox} {
    position: absolute;
    top: 24px;
    right: 12px;
    z-index: 1;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  ${StyledButton} {
    width: 100%;
    margin-top: 24px;
  }
`

export const DetailImageWrapper = styled.div`
  width: ${({width}) => width ? width : '260px'};
  margin: 0 auto;
  padding: ${({padding}) => padding ? padding : '0'};

  .check-form-wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 48px;
    padding-bottom: 20px;
  }

  .qr-code-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }

  .padding-bottom {
    padding-bottom: 4px;
  }

  .display-style {
    display: flex;
    justify-content: space-between;
  }

  .static-width {
    width: 115px;
  }

  ${StyledText} {
    font-size: 14px;
    display: flex;
  }

  ${StyledTitle} {
    font-size: 14px;
  }
`

export const TimeCardWrapper = styled.div`
  height: 66px;
  padding: 12px;
  border-radius: 6px;
  background: var(--default-white);
  box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);

  ${StyledText} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    span {
      color: var(--grey-dwed);
      font-size: 16px;
      line-height: 20px;
    }
  }
`

export const DashedBorderStyle = styled.div`
  padding: 0 12px;
  border: ${({color}) => color ? color : '1px dashed rgba(147, 147, 147, 0.5)'};
`

export const OnCloseModalWrapper = styled.div`
  height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;

  .justify {
    display: flex;
    justify-content: center;
  }

  ${IconBox} {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(43, 203, 186, 0.5);
    color: #2BCBBA;

    svg {
      width: 72px;
      height: 72px;
    }
  }

  ${StyledText} {
    font-size: 18px;
  }

  ${StyledTitle} {
    font-size: 18px;
  }
`

export const ModalActionsWrapper = styled.div`
  margin-top: 24px;

  ${StyledTitle} {
    font-family: var(--medium-text);
    font-size: 64px;

    .order-more {
      color: var(--primary-dwed);
    }

    .log-out {
      color: var(--danger-dwed);
    }
  }
`

export const UnregisteredAccountPageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

export const AccountScrollWrapper = styled.div`
  padding: 3px;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const AccountSpecialistsWrapper = styled.div`
  ${StyledText} {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: var(--grey-dwed);
  }
`

export const SpecialistNavLink = styled(NavLink)`
  margin-right: 16px;
  position: relative;

  ${StyledText} {
    span {
      -webkit-line-clamp: 2;
    }
  }

  &.active {
    ${StyledAvatar} {
      border: 3px solid var(--primary-dwed);
    }

    ${ShortCardContainer} {
      ${StyledAvatar} {
        border: 4px solid var(--primary-dwed);
      }

      ${StyledTitle} {
        color: var(--primary-dwed);
      }

      ${StyledText} {
        color: var(--primary-dwed);
      }
    }
  }
`

export const ServeSpecWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SpecialistConnectingWrapper = styled.div`
  display: flex;

  ${IconBox} {
    border-radius: 50%;
    background: var(--default-white);
    box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);
    margin-left: 12px;

    svg {
      margin: 20px;
      width: 24px;
      height: 24px;
    }
  }
`

export const TotalCostContainerWrapper = styled.div`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background: var(--default-white);
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
`

export const TotalCostItem = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;

  ${StyledTitle} {
    font-size: 16px;
    line-height: 19px;
  }
`

export const OrgOrderCartButtonWrapper = styled.div`
  box-shadow: 0 -2px 10px rgba(38, 38, 38, 0.25);
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  padding: 0 12px;

  ${StyledButton} {
    margin: 12px 0;
    height: 50px;
    width: 100%;
  }
`

export const ManageCountWrapper = styled.div`
  ${StyledButton} {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    text-align: center;
    background: var(--basic-grey-bg);
    padding: 0;
    color: var(--grey-dwed);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const ManageButton = styled.button`
  padding: 0;
  width: ${({width}) => width ? width : '24px'};
  height: ${({height}) => height ? height : '24px'};
  border-radius: 50%;
  text-align: center;
  background: var(--default-white);
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
  color: var(--grey-dwed);
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  outline: none;
  align-items: center;
  transition: .2s ease;
  touch-action: manipulation;
  overflow: visible;

  &&:hover {
    color: var(--primary-dwed);
  }

  &&:active {
    box-shadow: 0 0 7px var(--primary-dwed);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const ManageCountInput = styled.input`
  width: 100%;
  max-width: 48px;
  height: ${({height}) => height ? height : '24px'};
  background: var(--default-white);
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
  border-radius: 100px;
  border: none;
  text-align: center;
  font-size: ${({fontSize}) => fontSize ? fontSize : '14px'};

  &::placeholder {
    font-size: ${({fontSize}) => fontSize ? fontSize : '12px'};
    color: var(--grey-dwed);
    font-weight: 400;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &:focus {
    outline-color: var(--primary-dwed);
  }
`
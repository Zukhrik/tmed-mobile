import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText} from '../../../UIComponents/Typography/style'
import {StyledButton} from '../../../UIComponents/Button/style'
import {FixedHeaderInner} from '../../../Components/FixedHeader/style'


export const StreamChatComponent = styled.div`
  position: relative;
  padding-bottom: 55px;
  height: 100%;

  .chat-header {
    box-shadow: 0px -2px 10px rgba(38, 38, 38, 0.1);

    ${StyledText} {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

export const ChatWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: ${({display}) => display ? display : ''};
  z-index: 10;

  ${IconBox} {
    color: var(--default-white);
    background: var(--primary-dwed);
    width: 48px;
    height: 48px;
    border-radius: 50%;


    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const ChatOwnerInfoWrapper = styled.div`
  font-family: var(--medium-text);
  font-size: 14px;
  color: ${({color}) => color ? color : 'var(--dark-dwed)'};

  .message {
    span {
      color: var(--grey-dwed);
    }
  }
`

export const ChatTextWrapper = styled.div`
  font-family: var(--regular-text);
  font-size: 12px;
  color: ${({color}) => color ? color : 'var(--dark-dwed)'};
`

export const StreamChatForm = styled.form`
  width: 100%;
  position: fixed;
  background: var(--default-white);
  bottom: 0;
  height: 54px;
  z-index: 10;
  box-shadow: 0px -2px 10px rgba(38, 38, 38, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  input {
    width: 90%;
    height: 30px;
    border-radius: 6px;
    overflow: hidden;
    padding: 7px 12px;
    border: none;
    background: #F8F8F8;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--grey-dwed);
    }
  }

  ${IconBox} {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: var(--primary-dwed);
    color: var(--default-white);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const StreamPageWireframeWrapper = styled.div`
  padding-top: 50px;
  position: relative;
  height: 100vh;

  .padding {
    padding: 0 12px;
  }

  .padding-top {
    padding-top: 12px;
  }

  .description-title {
    font-size: 14px;
    color: var(--grey-dwed);
  }

  .description {
    width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-all;

    ${StyledText} {
      font-weight: 400;
      font-size: 14px;
    }

    ${IconBox} {
      color: var(--default-white);
      transition: .2s ease;
      transform: scaleY(${({status}) => status ? -1 : 1});
    }
  }
`

export const PlayerWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;
`

export const PlayerInfoWrapper = styled.div`
  position: absolute;
  top: 260px;
  padding-top: 12px;

  .channel-info-wrapper {
    display: flex;
    flex-direction: column;
    
    ${StyledText}{
      color: var(--grey-dwed);
    }
  }
`

export const CategoriesWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;

  ${StyledButton} {
    padding: 4px 8px;
    font-family: var(--regular-text);
    font-size: 12px;
    color: var(--grey-dwed);
    background: #F2F2F2;
    border-radius: 100px;
    margin-right: 4px;
  }
`

export const ChatComponentWrapper = styled.div`
  position: absolute;
  top: 260px;
  width: 100%;
`

export const ScheduleIdWireframeWrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;

  ${FixedHeaderInner} {
    ${IconBox} {
      color: var(--dark-dwed);
    }
  }

  ${StyledText} {
    white-space: pre-wrap;
    font-size: 14px;
  }
`
import styled from 'styled-components'
import {Col, Row} from 'antd'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'
import {Link, NavLink} from 'react-router-dom'
import {Container, IconBox} from '../../UIComponents/GlobalStyles'

export const ChatTabs = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #BFBFBF;
  border-radius: 6px;
  overflow: hidden;
`

export const ChatTabItem = styled(NavLink)`
  text-align: center;
  color: #fff;
  display: inline-block;
  width: 110px;
  padding: 3px 0;
  line-height: 24px;
  transition: .2s ease;

  &.active {
    background-color: var(--primary-dwed);
    color: #fff;

    &:first-child {
      border-radius: 0 6px 6px 0;
    }

    &:last-child {
      border-radius: 6px 0 0 6px;
    }
  }
`

export const ChatLisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`

export const ChatActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const StyledChatCol = styled(Col)`
  &:last-child {
    border-bottom: 0;
  }
`

export const StyledChatItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #BFBFBF;
`

export const StyledChatItemAvatar = styled.div`
  position: relative;
  margin-right: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`

export const ChatIsOnline = styled.div`
  position: absolute;
  border-radius: 50%;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border: 1px solid #e1e1e1;
  background-color: #2BCD61FF;
`

export const StyledChatItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  white-space: nowrap;

  ${StyledTitle} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    line-height: 24px;

    span {
      font-weight: 400;
      font-size: 12px;
      color: var(--grey-dwed);
    }

    svg {
      margin-left: auto;
      width: 14px;
      height: 14px;
      color: var(--grey-dwed);
      opacity: .6;
    }
  }

  ${StyledText} {
    display: flex;
    align-items: center;
    line-height: 20px;
    color: #808080;
    font-size: 14px;

    .typing-text {
      color: var(--primary-dwed);
      text-transform: lowercase;
    }
  }

`

export const ChatItemFile = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--grey-dwed);
  }
`

export const ChatItemTime = styled.div`
  text-align: right;
  font-size: 13px;
  font-weight: 400;
  color: var(--grey-dwed);
  line-height: 24px;
  margin-top: -3px;
`

export const ChatItemUnreadCount = styled.div`
  min-width: 20px;
  height: 20px;
  padding: 3px 4px 2px 4px;
  border-radius: 50%;
  background-color: ${({isMuted}) => isMuted ? '#D6D6D6' : 'var(--primary-dwed)'};
  color: #fff;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 20px;
`

export const ChatHeaderWrapper = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;

  ${Container} {
    @media (max-width: 576px) {
      padding: 0 8px;
    }
  }

  ${StyledText} {
    //&.new-chat-cancel {
    //  position: absolute;
    //  right: 0;
    //  top: 50%;
    //  transform: translateY(-50%);
    //  z-index: 10;
    //}
  }
`

export const ChatInputWrapper = styled.div`
  z-index: 5;
  margin-top: auto;
  overflow: hidden;
`

export const ChatInput = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px;
  transition: .2s ease;
  margin-top: auto;
  font-size: 12px;
  background-color: #fff;
  overflow: hidden;


  .textarea-wrapper {
    width: calc(100% - 84px);
    margin: 0 8px;
    background: #E9EDF0;
    border-radius: 5px;
    padding: 0 16px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 30vh;
  }

  .textarea {
    outline: none;
    font-size: 14px;
    user-select: text;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    -webkit-user-modify: read-write-plaintext-only;
    flex-grow: 1;
    width: 100%;
    line-height: 1.2;
    padding: 12px 0;

    &[contenteditable=true]:empty:before {
      content: attr(placeholder);
      display: block;
      color: #808080;
    }

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  form {
    display: flex;
    align-items: flex-end;
  }

  .attach-file {
    height: 40px;
  }

  button {
    outline: none;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-dwed);
    border-radius: 4px;
    width: 40px;
    height: 40px;

    ${IconBox} {
      color: #fff;
    }
  }

  @media (max-width: 576px) {
    padding: 6px 10px;
  }
`

export const ChatDetailList = styled(Container)`
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: overlay;
  display: flex;
  flex-direction: column-reverse;
  transition: .2s ease all;
  background-color: #faf9f9;
  height: ${({height}) => `calc(var(--vh, 1vh)*100 - ${height}px)`};
`

export const ChatMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({height}) => `calc(var(--vh, 1vh)*100 - ${height})`};
  overflow: hidden;
`

export const ChatOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  height: calc(100vh - 50px);
  z-index: 4;
`

export const SingleChatItemRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const SingleChatAvatar = styled.div`
  position: absolute;
`

export const SingleChatMessage = styled.div`
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 18px;
  color: var(--dark-dwed);
  background-color: ${({me}) => me ? '#CCE9FF' : '#fff'};
  //max-width: calc(70vw - 60px);
  margin: 6px 0;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  
  .message-item {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    user-select: none;
    max-width: 38vh;
  }

  //@media (max-width: 576px) {
  //  max-width: calc(95vw - 50px);
  //}
`

export const ChatDateInfo = styled(Row)`
  position: relative;
  bottom: auto;
  align-self: flex-end;
  top: 4px;
  margin-left: 8px;
  white-space: nowrap;
`

export const SingleChatMessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  
  img {
    display: inline-block;
    max-width: 60%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  }
  
  .message-file {
    display: flex;
    justify-content: flex-end;
    margin: 6px 0;
  }

  ${IconBox} {
    svg {
      width: 14px;
      height: 14px;
    }
  }

  ${StyledText} {
    color: var(--grey-dwed);
    font-size: 11px;
    line-height: 16px;
  }
`

export const NewChatWrapper = styled.div`
  padding-top: 50px;

  .chat-search-container {
    @media (max-width: 576px) {
      padding-bottom: 10px;
      border-bottom: 1px solid #BFBFBF;
    }
  }
`

export const ChatNewItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--primary-dwed);
  padding: 10px 0;
  font-size: 16px;

  svg {
    margin-right: 8px;
  }
`

export const ChatContactItem = styled(Link)`
  padding: 8px 0;
  display: block;

  ${StyledTitle} {
    font-size: 16px;
  }
`

export const ChatSeparateTitle = styled(Container)`
  background-color: #E5E5E5;
  height: 34px;
  display: flex;
  align-items: center;

  a {
    display: block;
    text-align: center;
    width: calc(100% / 3);
    color: var(--dark-dwed);
    line-height: 34px;
    font-weight: 500;
    transition: .2s all ease;
    flex-grow: 1;

    &.active {
      background-color: var(--primary-dwed);
      color: #fff;
    }
  }

  ${StyledTitle} {
    font-weight: 500;
  }
`

export const ChatDetailActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.2;
  min-width: 220px;
  border-bottom: 1px solid #CCCCCC;
  font-size: 16px;
  font-weight: 400;

  &:last-child {
    border-bottom: 0;
  }
`

export const ChatReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 50px 6px 16px;
  position: relative;
  background-color: #F2F2F2;

  ${IconBox} {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${StyledTitle} {
    line-height: 1.3;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: nowrap;
    }
  }
`

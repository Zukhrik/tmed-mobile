import styled, {css} from 'styled-components'
import {Container, IconBox} from '../../UIComponents/GlobalStyles'
import {Row} from 'antd'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'

export const MessagesHeaderContainer = styled(Container)`

`

export const MessagesHeaderRow = styled(Row)`
  height: 50px;
  align-items: center;

  ${StyledText} {
    min-height: 16px;
  }
`

export const MessagesRoot = styled.div`
  height: calc(100vh);
`

export const MessagesScrollableTarget = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: #faf9f9;
  transition: .2s ease all;
  height: calc(var(--vh) * 100 - (var(--chat-header-height) + ${({height}) => `${height}px`})) !important;
  overflow: scroll !important;
  overflow-x: hidden !important;
  overflow-y: overlay !important;
`

export const MessageGroupDate = styled.div`
  background-color: rgba(0, 0, 0, .2);
  margin: 0 auto;
  font-size: 12px;
  padding: 0 6px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
`

export const MessageGroupItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`

const getMsgAvatarPosition = ({me}) => {
    return me
        ? css`
              right: 0;
        `
        : css`
              left: 0;
        `
}

export const MessageItemRow = styled.div`
  position: relative;
  padding: ${({me, avatarShowed}) => avatarShowed ? me ? '0 40px 0 0' : '0 0 0 40px' : 0};
  margin-top: 6px;
  margin-bottom: 6px;
  display: flex;
  justify-content: ${({me}) => me ? 'flex-end': 'flex-start'};

  .message-item-avatar {
    position: absolute;
    bottom: 0;
    ${getMsgAvatarPosition}
  }
`

export const MessageText = styled.div`
  white-space: pre-wrap;
  overflow-wrap: break-word;
  user-select: none;
  max-width: 38vh;
  font-size: 14px;
  line-height: 1.2;
`

export const MessageContent = styled.div`
  border-radius: 5px;
  background-color: ${({me}) => me ? '#CCE9FF' : '#E9EDF0'};
  overflow: hidden;
  position: relative;
`

export const MessageTextContent = styled.div`
  padding: 6px 6px 6px 8px;
  display: flex;
  justify-content: space-between;
`

export const MessageReplyContent = styled.div`
  padding: 6px 10px 0 16px;
  line-height: 1.2;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    display: block;
    height: calc(100% - 6px);
    width: 1.5px;
    background-color: ${({me}) => me ? 'var(--primary-dwed)' : 'var(--grey-dwed)'};
    left: 8px;
    top: 6px;
  }

  ${StyledTitle} {
    max-width: 150px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
    }
  }

`

export const MessageStatusRow = styled(Row)`
  position: relative;
  bottom: auto;
  align-self: flex-end;
  top: 4px;
  margin-left: 8px;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
  }
`

export const MessageFileContent = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    max-width: 230px;
    height: auto;
  }

  .file-message-date {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 10px;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    border-radius: 3px;
    padding: 2px 3px;
    
    ${MessageStatusRow} {
      top: 0;
      margin: 0;
    }
    
    
    ${IconBox} {
      color: #fff;
    }
  }
`

export const MessageInputContainer = styled(Container)`
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: center;

  .text-input {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 5px;
    background-color: #E9EDF0;
    overflow: hidden;
  }

  textarea {
    border: 0;
    resize: none;
    flex-grow: 1;
    height: 24px;
    padding: 0;
    background-color: transparent;
    font-size: 14px;
    outline: none;
    margin-right: 8px;
  }

  .file-input {
    ${IconBox} {
      height: 40px;
      color: var(--primary-dwed);
    }
  }
`

export const MessageSendButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({isVoice}) => isVoice ? 'transparent' : 'var(--primary-dwed)'};
  color: ${({isVoice}) => isVoice ? 'var(--primary-dwed)' : '#fff'};
  outline: none;
  border: 0;
  border-radius: 50%;
  height: 40px;
  width: 40px;
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

export const MessageUploadedFileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  img {
    border-radius: 12px;
    width: 80%;
    height: auto;
  }
`
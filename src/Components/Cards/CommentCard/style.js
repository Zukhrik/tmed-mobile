import styled from 'styled-components'
import {StyledAvatar} from '../../../UIComponents/Avatar/style'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText} from '../../../UIComponents/Typography/style'

export const CommentCardWrapper = styled.div`

  ${StyledAvatar} {
    margin-right: 8px;
  }

  .comment-data {
    display: flex;
    flex-direction: column;
  }

  .reply-comment-wrapper {
    padding-top: 12px;
  }
`

export const CommentDataWrapper = styled.div`
  padding: 8px 12px;
  background: #F2F2F2;
  border-radius: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;

  .account-category {
    font-size: 10px;
    color: var(--grey-dwed);
  }
`

export const CommentOwnerNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const CommentTimeAndMoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${IconBox} {
    transform: rotate(90deg);
    margin-left: 3px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const CommentActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  height: 13px;

  ${StyledText} {
    color: var(--grey-dwed);
  }

  ${IconBox} {
    font-family: var(--regular-text);
    font-size: 12px;
    margin-right: 12px;

    &.likes-count {
      margin: 0;

      &:before {
        content: '';
        height: 16px;
        background: #F2F2F2;
        width: 1px;
        margin-right: 16px;
      }
    }

    svg {
      margin-right: 8px;
      width: 16px;
      height: 15px;
    }
  }
`

export const ViewReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--grey-dwed);
  font-size: 12px;
  margin-top: 12px;
`
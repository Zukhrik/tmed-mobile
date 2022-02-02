import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledButton} from '../../../UIComponents/Button/style'

export const TapeFixedHeaderWrapper = styled.div`
  width: 100%;

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-dwed);
  }

  .create-post-wrapper {
    display: flex;
    cursor: default;
    align-items: center;
    justify-content: center;
    color: ${({color}) => color ? color : 'var(--dark-dwed)'};
    margin-right: ${({marginRight}) => marginRight && `${marginRight}px`};

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const LeaveFeedbackWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 8px 12px;
  background: var(--default-white);

  ${IconBox} {
    color: var(--default-white);
  }

  ${StyledButton} {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    background: var(--primary-dwed);
    color: var(--default-white);
    padding: 7px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
`

export const FeedbackInput = styled.input`
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  margin-top: 4px;
  background: var(--basic-grey-bg);
  outline: none;
`


export const ReplyItemWrapper = styled.div`
  color: var(--dark-dwed);

  svg {
    width: 8px;
    height: 8px;
  }
`
import styled from 'styled-components'
import {StyledText} from '../../Typography/style'
import {IconBox} from '../../GlobalStyles'

export const AuthorPageWireframeWrapper = styled.div`
  padding-top: ${({paddingTop}) => paddingTop ? paddingTop : 'unset'};
  padding-bottom: 60px;
  position: relative;

  .react-slidedown {
    overflow-x: hidden;
  }

  .container {
    padding: 0 12px;
  }

  .cat-name-style {
    font-size: 18px;
    color: var(--grey-dwed);
    margin-bottom: 8px;
  }
`

export const PushButton = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-dwed);

  ${StyledText} {
    color: var(--default-white);
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }

  ${IconBox} {
    color: var(--default-white);
    margin-left: 12px;

    ${StyledText} {
      color: var(--default-white);
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      margin-right: 6px;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const AccountFixedHeaderWrapper = styled.div`
  ${IconBox} {
    svg {
      width: 65px;
      height: 24px;
    }
  }

  .icons-wrapper {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`
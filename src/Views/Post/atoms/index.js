import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {CardWrapInfo} from '../../../Components/Cards/ShortCard/style'

export const PostPageWrapper = styled.div`
  height: 100vh;
  position: relative;
  padding-top: ${({paddingTop}) => paddingTop ? `${paddingTop}px` : ''};

  .row-wrap {
    margin-top: 12px;
  }

  ${CardWrapInfo} {
    ${StyledTitle} {
      font-size: 14px;
    }

    ${StyledText} {
      font-size: 12px;
    }
  }

  .padding {
    padding: 0 12px;
  }

  .post-description {
    ${StyledText} {
      white-space: nowrap;
      overflow: hidden;
    }
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }

  .more-text {
    color: var(--primary-dwed);
  }
`

export const IconItemWrapper = styled.div`
  color: var(--grey-dwed);
  display: flex;
  align-items: center;

  ${IconBox} {
    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  ${StyledText} {
    color: var(--grey-dwed);
    font-size: 14px;
    line-height: 16px;
  }
`
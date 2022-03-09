import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledButton} from '../../../UIComponents/Button/style'
import {StyledText} from '../../../UIComponents/Typography/style'

export const PeopleCardWrapper = styled.div`
  background-color: var(--default-white);
  border-radius: var(--basic-border-radius);

  ${IconBox} {
    svg {
      width: 24px;
      height: 24px;
    }
  }

  .category-text {
    ${StyledText} {
      font-size: 10px;
      color: var(--grey-dwed);
    }
  }

  .rating-wrapper {
    display: flex;

    ${IconBox} {
      font-size: 10px;
      font-family: var(--regular-text);
      margin-right: 8px;

      svg {
        width: 17px;
        height: 17px;
      }
    }
  }

  ${StyledButton} {
    font-size: 12px;
    font-family: var(--regular-text);
  }
`
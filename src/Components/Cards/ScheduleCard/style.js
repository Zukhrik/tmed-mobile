import styled from 'styled-components'
import {StyledButton} from '../../../UIComponents/Button/style'
import {StyledText} from '../../../UIComponents/Typography/style'

export const ScheduleCardWrapper = styled.div`
  padding: 6px 0;

  ${StyledButton} {
    color: var(--primary-dwed);
    box-shadow: none;
    padding: 0;
  }

  .schedule-card-wrapper {
    img {
      object-fit: cover;
      width: 96px !important;
      height: 96px;
      border-radius: var(--basic-border-radius);
    }
  }

  .time-wrapper {
    ${StyledText} {
      color: var(--grey-dwed);
    }
  }
`
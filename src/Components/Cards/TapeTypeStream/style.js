import styled from 'styled-components'
import {StyledAvatar} from '../../../UIComponents/Avatar/style'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const TapeTypeStreamWrapper = styled.div`
  position: relative;
  border-radius: var(--basic-border-radius);
  border: 1px solid var(--basic-grey-bg);
  margin-right: 8px;
  width: 250px;
  overflow: hidden;

  ${IconBox} {
    width: 30px;
    height: 30px;
    top: 13px;
    z-index: 1;
    right: 13px;
    border-radius: 50%;
    position: absolute;
    color: var(--default-white);
    background: var(--dark-dwed);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const StreamImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 140px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.0127407) 8.59%, rgba(0, 0, 0, 0.0485926) 17.48%, rgba(0, 0, 0, 0.104) 26.53%, rgba(0, 0, 0, 0.175407) 35.61%, rgba(0, 0, 0, 0.259259) 44.59%, rgba(0, 0, 0, 0.352) 53.34%, rgba(0, 0, 0, 0.450074) 61.73%, rgba(0, 0, 0, 0.549926) 69.63%, rgba(0, 0, 0, 0.648) 76.9%, rgba(0, 0, 0, 0.740741) 83.41%, rgba(0, 0, 0, 0.824593) 89.03%, rgba(0, 0, 0, 0.896) 93.63%, rgba(0, 0, 0, 0.951407) 97.08%, rgba(0, 0, 0, 0.987259) 99.25%, #000000 100%), url(${props => props.src}) center center no-repeat;
  background-size: 100%;
`

export const StreamInfoWrapper = styled.div`

  ${StyledTitle} {
    color: var(--default-white);
    background-color: var(--danger-dwed);
    padding: 3px 10px;
    border-radius: 5px;
    position: absolute;
    top: 8px;
    left: 8px;
  }

  ${StyledText} {
    padding: 3px 10px;
    color: var(--default-white);
    background-color: var(--dark-dwed);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 8px;
    left: 8px;

    svg {
      height: 16px;
      width: 16px;
      margin-right: 5px;
    }
  }

  ${StyledAvatar} {
    background-color: var(--grey-border);
    border: 1.5px solid var(--danger-dwed);
  }
`
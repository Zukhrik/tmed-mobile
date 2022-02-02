import styled from 'styled-components'
import {StyledAvatar} from '../../../../UIComponents/Avatar/style'
import {StyledText, StyledTitle} from '../../../../UIComponents/Typography/style'
import {Link} from 'react-router-dom'


export const StreamItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  .stream-owner-wrapper {
    margin-top: 8px;
  }
`

export const BlurBackground = styled(Link)`
  width: 100%;
  height: 200px;
  background: url('${props => props.src}') center center no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
  }
`

export const StreamAvatarWrapper = styled.div`
  ${StyledAvatar} {
    margin-right: 12px;
  }
`

export const LiveStreamInfoWrapper = styled.div`
  position: absolute;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px;

  ${StyledTitle} {
    color: var(--default-white);
    font-size: 10px;
    padding: 3px 6px;
    background-color: var(--danger-dwed);
    border-radius: var(--basic-border-radius);
  }

  ${StyledText} {
    border-radius: 100px;
    background: rgba(38, 38, 38, 0.8);
    color: var(--default-white);
    display: flex;
    align-items: center;
    padding: 5px 8px;
    font-size: 11px;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`
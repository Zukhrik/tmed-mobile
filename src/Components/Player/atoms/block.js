import styled, {keyframes} from "styled-components";

const buttonAnimate = keyframes`
  from {
    transform: scale(0.9);
    opacity: .5;
  }
  to {
    transform: scale(1.1);
    opacity: 1;
  }
`


export const PlayerControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  height: 64px;
  //transform: translateY(68px);
  transition: .5s;
  opacity: 0;
  z-index: 3;

  @media (max-width: 768px) {
    padding: 0 12px;
  }

  button {
    &.player-buttons {
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      color: #FFFFFF;
      transition: .3s;

      &:hover {
        cursor: pointer;
        color: var(--grey-basic);
      }
    }
  }
`

export const PlayerVolumeBlock = styled.div`
  width: 128px;
  display: flex;
  align-items: center;
  margin-left: 18px;

  button {
    margin-right: 8px;
  }

  .ant {
    &-slider {
      flex: 1;
    }

    &-slider {
      &-rail {
        background-color: rgba(255, 255, 255, 0.25);
        height: 2px;
        border-radius: 2px;
      }

      &-track {
        background-color: #FFFFFF;
        height: 2px;
        border-radius: 2px;
      }

      &-handle {
        width: 12px;
        height: 12px;
        background: #FFFFFF;
        border: none;
      }

      &:hover, &:focus {
        .ant {
          &-slider {
            &-track {
              background-color: var(--grey-basic);
            }
          }
        }
      }
    }
  }
`

export const PlayerControlLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`

export const PlayerControlRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


export const DwedPlayerBlock = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  background: #000;
  width: 100%;
  max-height: 210px;
  height: 100%;

  svg {
    &.loading {
      position: absolute;
      z-index: 2;
      color: #FFFFFF;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
      width: 100px;
      height: 100px;
    }
  }

  video {
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    background: #000;
    pointer-events: none;
    max-height: 346px;
    width: 100%;
    height: 210px;
    object-fit: contain;
  }

  &.active {
    ${PlayerControlBar} {
      opacity: 1;
      //transform: translateY(0);
    }
  }

  &.full-screen {
    max-height: 100%;
    height: 100%;

    video {
      height: 100%;
      max-height: 100%;
    }
  }
`
export const AnimateButtonsBlock = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;

  div.animate {
    animation: ${buttonAnimate} 0.3s linear;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 50px;
    height: 50px;

    svg {
      width: 25px;
    }
  }

`

export const VideoError = styled.div`
  display: flex;
  background: linear-gradient(0deg, #262626, #262626);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 210px;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 18px;

    svg {
      margin-right: 8px;
    }
  }
`
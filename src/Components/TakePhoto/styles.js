import styled from 'styled-components'
import {StyledButton} from '../../UIComponents/Button/style'

export const CameraWrapper = styled.div`
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
  align-items: center;

  ${StyledButton} {
    svg {
      margin-right: 8px;
    }
  }

  .react-html5-camera-photo {
    margin-top: auto;
  }

  #container-circles {
    bottom: 55px;
    transform: scale(.5);
  }

  .react-html5-camera-photo > img, .react-html5-camera-photo > video {
    border-radius: ${({shape}) => shape && shape === 'square' ? '6px' : '50%'} !important;
    width: 450px;
    height: auto;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    right: -24px;
    background-color: #E5E5EA;
    top: 0;
  }
`

export const UploadedImage = styled.div`
  width: 450px;
  height: 450px;
  background-image: url("${({imgUrl}) => imgUrl}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  margin-top: auto;
  border-radius: ${({shape}) => shape && shape === 'square' ? '6px' : '50%'};
`
import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'

export const SliderWrapper = styled.div`
  position: relative;

  .react-multi-carousel-dot button {
    width: 6px;
    height: 6px;
    border-width: 0;
    margin-right: 5px;
  }

  .react-multi-carousel-dot-list {
    left: 50%;
    right: unset;
    display: inline-flex;
    transform: translateX(-50%);
    padding: 12px 0;
    z-index: 3;
  }

  .offering-gallery-item {
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }

  ${IconBox} {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 1;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const ImageCountView = styled.div`
  position: absolute;
  top: 12px;
  z-index: 1;
  right: 12px;
  font-weight: normal;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 50%;
  color: var(--default-white);
  background: var(--grey-dwed);
`
import styled from 'styled-components'

export const ImageLazyLoadWrapper = styled.div`
  position: relative;
  
  .loading-progress {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
`
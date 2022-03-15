import styled from 'styled-components'

export const OverlayContentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 30px 12px 0 12px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background: var(--default-white);
  transition: 0.5s;
  left: 0;
  z-index: 1111;
  overflow: auto;
  transform: translateY(${props => props.status ? 0 : '100%'});
`

export const SettingsOverlayWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1110;
  bottom: 0;
  left: 0;
  background-color: rgba(127, 146, 160, 0.4);
  overflow-y: hidden;
  transition: 0.2s;
`

export const OverlayWrapper = styled.div`
  z-index: 1110;
  opacity: ${props => props.status ? 1 : 0};
  visibility: ${props => props.status ? 'visible' : 'hidden'};

  ${OverlayContentWrapper} {
    transform: translateY(${props => props.status ? 0 : '100%'});
  }
`
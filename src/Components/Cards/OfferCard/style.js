import styled from 'styled-components'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {StyledAvatar} from '../../../UIComponents/Avatar/style'

export const OfferCardWrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: var(--basic-border-radius);
`

export const AvatarWrapper = styled.div`
  position: relative;

  ${StyledAvatar} {
    background-color: var(--grey-border);
    width: 100%;
  }

  ${IconBox} {
    right: 10px;
    width: 24px;
    height: 24px;
    bottom: 10px;
    border-radius: 50%;
    position: absolute;
    color: var(--primary-dwed);
    border: 1px solid transparent;
    background-color: var(--default-white);

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const OfferInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  margin-top: 10px;
`
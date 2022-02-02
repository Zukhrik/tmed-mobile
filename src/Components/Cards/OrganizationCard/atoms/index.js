import styled from 'styled-components'
import {IconBox} from '../../../../UIComponents/GlobalStyles'
import {StyledAvatar} from '../../../../UIComponents/Avatar/style'
import {StyledText, StyledTitle} from '../../../../UIComponents/Typography/style'

export const OrganizationCardWrapper = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: var(--basic-shadow);
`


export const BackgroundImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  object-position: center;
`

export const OrganizationInfoWrapper = styled.div`
  padding: 12px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--default-white);
  box-shadow: var(--basic-shadow);

  ${StyledTitle} {
    font-size: 13px;
    line-height: 13px;
    margin-top: 8px;
  }

  ${StyledText} {
    font-size: 11px;
    line-height: 11px;
  }
`

export const AvatarContainerWrapper = styled.div`
  position: absolute;
  display: flex;
  border-radius: 15px 2px;
  justify-content: center;
  align-items: center;
  top: -18px;
  left: -12px;

  ${IconBox} {
    position: absolute;
    top: -5px;
    left: -25px;
    content: "";
    display: block;
    width: 76px;
    height: 31px;
    clip: rect(0px, 76px, 26px, 10px);
    background: #fff;
  }

  ${StyledAvatar} {
    position: absolute;
    left: 22px;
    top: 8px;
  }
`

export const CircleSkeletonWrapper = styled.div`
  position: absolute;
  top: 8px;
`

export const SubscribeButton = styled.div`
  cursor: pointer;
  z-index: 100;
  position: absolute;
  right: 12px;
  bottom: 7px;

  ${StyledText} {
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-dwed);
`
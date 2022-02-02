import styled from 'styled-components'
import {Avatar} from 'antd'

export const StyledAvatar = styled(Avatar)`
  position: relative;
  font-size: 12px !important;
  line-height: unset !important;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    flex-grow: 1;
  }

  .lazy-load-image-background {
    border-radius: ${({shape}) => !shape ? '50%' : 0};
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid var(--primary-dwed);
    display: ${({active}) => active ? 'block' : 'none'};
  }
}
`

export const UploadAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledUploadAvatar = styled(Avatar)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-avatar-string {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ant-avatar {
    background-color: var(--grey-dwed);
  }

  svg {
    width: 48px;
    height: 48px;
    color: var(--grey-dwed);
  }

  &::before {
    content: '';
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--primary-dwed);
    display: ${({active}) => active ? 'block' : 'none'}
  }
`

export const AvatarInnerIconWrapper = styled.div`
  background-color: var(--primary-dwed);
  color: var(--default-white);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media(min-width: 1080px) {
    right: 36px;
    height: 40px;
    width: 40px;
  }

  svg {
    height: 18px;
    width: 18px;
  }
`

import styled from 'styled-components'
import {Skeleton} from '@material-ui/lab'
import {Modal} from 'antd'

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0 12px;
`

export const IconBox = styled.div`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  color: ${({color}) => color ? color : 'var(--dark-dwed)'};
  margin-right: ${({marginRight}) => marginRight && `${marginRight}px`};
`

export const RootContent = styled.div`
  position: relative;
  height: ${({height}) => height ? height : '100%'};
  background-color: ${({background}) => background ? background : 'var(--default-white)'};
  padding-top: ${({paddingTop}) => paddingTop ? `${paddingTop}px` : 'unset'};
  padding-bottom: ${({paddingBottom}) => paddingBottom ? `${paddingBottom}px` : 'unset'};
  
  .container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0 12px;
  }
`

export const SkeletonUI = styled(Skeleton)`
    //margin: ${({offset}) => offset ? `${offset}px 0` : 0};

  &.MuiSkeleton-root {
    //border-radius: 20px;
  }

  &.MuiSkeleton-text {
    //transform: scale(1, 0.75);
  }

`

export const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({height}) => height ? `${height}px` : 'auto'};
`

export const StreamBlurBackground = styled.div`
  width: 100%;
  height: ${({height}) => height ? `${height}px` : '264px'};
  background: url('${props => props.src}') center center no-repeat;
  background-size: cover;
  position: relative;

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

export const BoxShadowBasic = styled.div`
  box-shadow: 0 2px 14px rgba(29, 161, 242, 0.15);
`

export const FastAuthModal = styled(Modal)`
  max-width: 100vw;
  margin: 0 !important;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  top: 0;
  bottom: 0;

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-close-x {
    font-size: 20px;
    color: var(--dark-dwed);

    @media (width: 1080px) {
      color: var(--default-white);
      font-size: 28px;
      display: none;
    }
  }

  .ant-modal-close {
    @media (width: 1080px) {
      top: 12px;
      right: 12px;
    }
  }
`

export const EmptyContainerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
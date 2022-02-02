import styled, {keyframes} from 'styled-components';

export const ProgressItemWrapper = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  margin-left: 10px;
  align-items: center;
  color: ${({color}) => color ? color : 'var(primary-dwed)'};
`

export const ProgressBack = styled.div`
  height: 6px;
  width: 100%;
  display: flex;
  margin-left: 8px;
  overflow: hidden;
  border-radius: 8px;
  flex-direction: column;
  background-color: var(--basic-grey-bg);
`

export const getProgressBar = ({width}) => {
  return keyframes`
    0% {
      width: 0;
    }
    100% {
      width: ${width}%;
    }
  `
}

export const MainProgress = styled.div`
  height: 100%;
  border-radius: 8px;
  width: ${({width}) => width ? width : 0}%;
  background-color: ${({color}) => color ? color : 'var(primary-dwed)'};
  box-shadow: ${({shadowColor}) => shadowColor ? `0 1px 4px ${shadowColor}` : 'unset'};
  transition: .3s ease;

  &.animate {
    animation: ${getProgressBar} 0.8s;
    animation-fill-mode: forwards;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }
`

export const RatingSkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-skeleton-element .ant-skeleton-button {
    width: 156px;
    height: 10px;
  }
`
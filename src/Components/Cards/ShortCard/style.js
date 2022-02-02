import styled from 'styled-components'
import {StyledText, StyledTitle} from '../../../UIComponents/Typography/style'
import {INFO_MAT_SIZE} from '../../../Constants/app'

export const CardImgWrapper = styled.div`
  margin-right: 12px;
`

export const ShortCardContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${({height}) => height ? `${height}px` : 'auto'};
  flex-direction: ${({direction}) => direction && direction === 'vertical' ? 'column' : 'row'};

  ${CardImgWrapper} {
    margin-right: ${({direction}) => direction === 'vertical' ? 0 : 12}px;
    position: relative;

    svg {
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }

  ${StyledTitle} {
    text-align: ${({direction}) => direction && direction === 'vertical' ? 'center' : 'left'};
    line-height: 1.4;
  }

  ${StyledText} {
    text-align: ${({direction}) => direction && direction === 'vertical' ? 'center' : 'left'};
    line-height: 1.4;

    // @media (max-width: ${INFO_MAT_SIZE}px) {
    //   font-size: 14px;
    // }
  }

  .ant-skeleton-element {
    padding: 0 16px;
  }
`

export const VerticalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CardWrapInfo = styled.div`
  a {
    color: var(--dark-dwed);
  }

  ${StyledTitle} {
    font-style: normal;
    line-height: 24px;
    font-family: var(--medium-text);

    span {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  ${StyledText} {
    color: var(--grey-dwed);
    font-style: normal;
    line-height: 16px;
    letter-spacing: 0.4px;

    span {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  flex-grow: 1;
`

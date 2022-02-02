import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {OfferCardWrapper} from '../Cards/OfferCard/style'
import {StyledAvatar} from '../../UIComponents/Avatar/style'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'
import {StyledButton} from '../../UIComponents/Button/style'

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--default-white);
`

export const PostInfoWrapper = styled.div`
  padding: 12px;
  position: relative;

  ${StyledAvatar} {
    background-color: var(--input-border-color);
    border: 1px solid var(--grey-border);
    margin-right: 8px;
  }

  ${IconBox} {
    color: var(--dark-dwed);

    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${StyledText} {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: var(--grey-dwed);

    span {
      font-weight: 500;
      line-height: 19px;
      color: var(--dark-dwed);
      font-family: "Roboto", sans-serif;
    }
  }

  ${StyledTitle} {
    font-size: 14px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    flex: 1;
  }
`

export const PostOwnerNameWrapper = styled.div`
  display: flex;
`

export const PostTime = styled.div`
  font-family: var(--regular-text);
  font-size: 11px;
  color: var(--grey-dwed);
`

export const PostMoreWrapper = styled.div`
  position: absolute;
  border-radius: var(--basic-border-radius);
  box-shadow: 0 6px 12px rgb(0 0 0 / 15%);
  background: #fff;
  padding: 8px 16px;
  margin-top: 10px;
  top: 100%;
  right: 0;
  z-index: 10;

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--grey-dwed);
  }

  ${StyledText} {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const PostOwnerWrapper = styled.div`

`

export const CardPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const PostBottomBorder = styled.div`
  border-bottom: 3px solid rgba(242, 242, 242, 0.25);
`

export const CardControlWrapper = styled.div`
  border-bottom: 1px solid rgba(38, 38, 38, 0.1);

  .post-indicator-wrapper {
    padding: 0 12px;
    border-bottom: 1px solid rgba(38, 38, 38, 0.1);
    border-top: 1px solid rgba(38, 38, 38, 0.1);
    height: 30px;
    display: flex;
  }

  ${StyledText} {
    font-size: 12px;
    color: var(--grey-dwed);
  }
`

export const PostIndicatorItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: var(--grey-dwed);
  margin-right: 10px;

  svg {
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`

export const IconItemWrapper = styled.div`
  color: var(--grey-dwed);
  display: flex;
  align-items: center;
  height: 40px;

  ${IconBox} {
    ${StyledText} {
      margin-left: 8px;
      color: var(--grey-dwed);
      font-size: 14px;
      line-height: 16px;

      &:hover {
        color: var(--primary-dwed);
      }
    }

    &:hover {
      color: var(--primary-dwed);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const CommonPostWrapper = styled.div`
  ${StyledText} {
    font-size: 16px;
    font-weight: normal;
    line-height: 130%;
    white-space: pre-wrap;
  }

  ${StyledAvatar} {
    width: 100%;
    height: auto;
    margin-top: 12px;
    border-radius: var(--basic-border-radius);
  }
`

export const PostImagesWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: auto;
  }

  .react-multi-carousel-dot-list {
    left: 50%;
    right: unset;
    display: inline-flex;
    transform: translateX(-50%);
    padding: 12px 0;
    z-index: 3;
  }

  .react-multi-carousel-dot--active button {
    background-color: grey;
  }

  .react-multi-carousel-dot button {
    border-color: transparent;
  }
`

export const PostDescriptionWrapper = styled.div`
  padding: 0 12px;
  word-break: break-word;

  span {
    color: var(--primary-dwed);
    text-decoration: underline;
  }

  ${StyledText} {
    padding-bottom: 12px;
    font-size: 12px;
    line-height: 14px;
    white-space: pre-wrap;
    color: var(--dark-dwed);
    overflow: hidden;
  }
`

export const StreamImageWrapper = styled.div`
  margin-top: 12px;
`

export const StreamPostsOwnerWrapper = styled.div`
  background: #F2F2F2;
  display: flex;
  flex-direction: column;
`

export const StreamPostWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .sub-text {
    ${StyledText} {
      color: var(--grey-dwed);
    }
  }

  .streamer-info {
    padding-top: 4px;
    background: #F2F2F2;

    img {
      margin: -16px 12px 0 12px;
      object-fit: cover;
      border-radius: 6px;
      overflow: hidden;
      height: 50px;
      width: 50px;
    }
  }
`

export const HasOfferingsCardWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;
  justify-content: flex-start;

  ${OfferCardWrapper} {
    margin: 12px;
  }

  &::-webkit-scrollbar {
    height: 0;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`

export const ActionPostWrapper = styled.div`
  padding: 16px;
`

export const CreatePostWrapper = styled.div`
  background-color: #fff;
  padding: 12px;
  border-bottom: 1px solid rgba(242, 242, 242, 0.5);

  ${StyledButton} {
    margin-top: 10px;
  }

  label {
    input {
      display: none;
    }
  }

  img {
    max-width: 150px;
    height: auto;
  }
`

export const CreateTextarea = styled.textarea`
  width: 100%;
  display: flex;
  background: transparent;
  padding: ${({open}) => open ? '0 0 12px 0' : ''};
  border: 0;
  border-bottom: 1px solid ${({open}) => open ? '#8E8E93' : 'transparent'};
  font-size: 16px;
  min-height: ${({minHeight}) => minHeight ? `${minHeight}px` : '50px'};
  overflow-x: hidden;
  overflow-y: auto;
  color: var(--grey-dwed);
  height: ${({open}) => open ? '100px' : '24px'};
  max-height: ${({open}) => open ? '100px' : '24px'};
  transition: .2s ease all;
  outline: none;
  resize: none;
`

export const CreatePostFixedHeaderWrapper = styled.div`
  .close-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${StyledTitle} {
    font-size: 18px;
  }

  ${StyledButton} {
    color: var(--primary-dwed);
    padding: 0;
    font-size: 18px;
    font-family: var(--medium-text);
  }
`

export const CreatePostBodyWrapper = styled.div`
  .padding {
    padding: 0 12px;
  }

  .actions-wrapper {
    border-top: 1px solid var(--grey-dwed);
    display: flex;
    justify-content: flex-start;

    label {
      padding: 12px;
      color: var(--grey-dwed);

      input {
        display: none;
      }
    }
  }
`

export const PostImagesScrollBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 12px;
`

export const PostImageItem = styled.div`
  position: relative;
  min-width: 144px;
  height: 144px;
  margin-right: 5px;

  ${IconBox} {
    border-radius: 50%;
    background: #7F92A0;
    color: var(--default-white);
    position: absolute;
    top: 4px;
    right: 4px;
    mix-blend-mode: hard-light;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  img {
    border-radius: 8px;
    overflow: hidden;
    width: 144px;
    height: 144px;
    object-fit: cover;
  }
`
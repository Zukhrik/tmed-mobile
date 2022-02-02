import styled from 'styled-components'
import {Button} from '../../UIComponents/Button'

export const PostDescriptionWrapper = styled.div`
  white-space: pre-wrap;

  span {
    color: var(--primary-dwed);
  }
`

export const MediasWrapper = styled.div`
  margin: 12px 0;

  img {
    height: 300px;
    width: 100%;
    object-fit: contain;
  }
`

export const RepostTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 4px;
  padding: 8px;
  border-color: var(--input-border-color);
`

export const RepostButtonWrapper = styled(Button)`
  font-size: 16px;
  line-height: 18px;
  position: fixed;
  bottom: 40px;
  width: 100%;
`
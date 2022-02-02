import styled from "styled-components";

export const DropzoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #FBFBFB;
  border: 2px dashed ${(
    {
        isDragActive,
        error
    }
) => error ? 'var(--danger-dwed)' : isDragActive ? 'var(--primary-dwed)' : '#F0F1F2'};
  border-radius: 4px;
  padding: 6px;
  position: relative;
  outline: none;
  cursor: pointer;
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '190px'};
  transition: .2s all ease;
`

export const DropzoneImgPreview = styled.div`
  background-image: url("${({imgUrl}) => imgUrl}");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`

export const AddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  svg {
    color: var(--grey-dwed);
    width: 24px;
    height: 24px;
  }
`

export const DropzoneText = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.25px;
  color: var(--grey-dwed);
`

export const DropzoneVideoPreview = styled.video`
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  object-fit: contain;
`
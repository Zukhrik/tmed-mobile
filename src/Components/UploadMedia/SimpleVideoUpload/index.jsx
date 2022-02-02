import React, {useCallback} from 'react'
import {useTranslation} from "react-i18next";
import {fileToBase64} from "../../../utils/crop-utils";
import {useDropzone} from "react-dropzone";
import {AddIcon, DropzoneText, DropzoneVideoPreview, DropzoneWrapper, StyledDropzone} from "../style";
import {StyledInputError} from "../../../UIComponents/mu-inputs/atoms";
import {VideoSvg} from "../../../Icons/Video";

export const SimpleVideoUpload = ({label, onChange, value, onBlur, error}) => {
    const {t} = useTranslation()

    const onDrop = useCallback(async (file) => {
        console.log(file)
        try {
            const videoUrl = await fileToBase64(file[0])
            const params = {
                videoUrl,
                file: file[0]
            }
            onChange(params)
        } catch (e) {
            console.log(e);
        }
    }, [onChange])

    const onFileDialogCancel = () => {
        if (onBlur) {
            onBlur()
        }
    }

    const options = {
        onDrop,
        onFileDialogCancel,
        maxFiles: 1,
        accept: ['video/*'],
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone(options)


    return (
        <DropzoneWrapper>
            {
                label && <DropzoneText style={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    textAlign: 'left',
                    marginBottom: 4
                }}
                >
                    {label}
                </DropzoneText>
            }
            <StyledDropzone
                error={!!error}
                {...getRootProps()}
                isDragActive={isDragActive}
                height='300px'
            >
                <input {...getInputProps()} />
                {
                    value && value.videoUrl
                        ? <DropzoneVideoPreview autoPlay loop src={value.videoUrl}/>
                        : (
                            <>
                                <AddIcon>
                                    <VideoSvg style={{width: 32, height: 32}}/>
                                </AddIcon>
                                <DropzoneText>
                                    {t('upload_video')}
                                </DropzoneText>
                            </>
                        )
                }
            </StyledDropzone>
            {error && <StyledInputError>{error}</StyledInputError>}
        </DropzoneWrapper>
    )
}
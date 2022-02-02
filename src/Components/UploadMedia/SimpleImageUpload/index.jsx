import React, {useCallback} from 'react'
import {useDropzone} from "react-dropzone";
import {fileToBase64} from "../../../utils/crop-utils";
import {AddIcon, DropzoneText, DropzoneImgPreview, DropzoneWrapper, StyledDropzone} from "../style";
import {PlusSvg} from "../../../Icons/Plus";
import {StyledInputError} from "../../../UIComponents/mu-inputs/atoms";
import {useTranslation} from "react-i18next";

export const SimpleImageUpload = ({onChange, onBlur, value, error, label}) => {
    const {t} = useTranslation()

    const onDrop = useCallback(async (file) => {
        try {
            const imgUrl = await fileToBase64(file[0])
            const params = {
                imgUrl,
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
        accept: ['image/x-png', 'image/jpeg', 'image/png'],
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
            >
                <input {...getInputProps()} />
                {
                    value && value.imgUrl
                        ? <DropzoneImgPreview imgUrl={value.imgUrl}/>
                        : (
                            <>
                                <AddIcon>
                                    <PlusSvg/>
                                </AddIcon>
                                <DropzoneText>
                                    {t('add_photo')}
                                </DropzoneText>
                            </>
                        )
                }
            </StyledDropzone>
            {error && <StyledInputError>{error}</StyledInputError>}
        </DropzoneWrapper>
    )
}
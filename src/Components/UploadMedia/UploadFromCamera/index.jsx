import React, {useState} from 'react'
import {AddIcon, DropzoneImgPreview, DropzoneText, StyledDropzone} from '../style'
import {PlusSvg} from '../../../Icons/Plus'
import {StyledInputError} from '../../../UIComponents/mu-inputs/atoms'
import {TakePhoto} from '../../TakePhoto'
import {Modal} from '../../../UIComponents/Modal'
import {useTranslation} from 'react-i18next'

export const UploadFromCamera = ({value, error, onChange}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {t} = useTranslation()
    console.log(value)
    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={t('take_picture')}
                component={<TakePhoto shape='square' sendPhoto={onChange} onClose={() => setModalIsOpen(false)} />}
            />
            <StyledDropzone error={!!error} onClick={() => setModalIsOpen(true)}>
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
        </>
    )
}
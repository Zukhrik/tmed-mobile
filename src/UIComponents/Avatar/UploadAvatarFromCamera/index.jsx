import React, {useState} from 'react'
import {AvatarInnerIconWrapper, AvatarWrapper, StyledUploadAvatar, UploadAvatarWrapper} from '../style'
import {CircularProgress} from '@material-ui/core'
import {PersonalFillSvg} from '../../../Icons/PersonalFill'
import {IconBox} from '../../GlobalStyles'
import {UploadCloudSvg} from '../../../Icons/UploadCloud'
import {Modal} from '../../Modal'
import {useTranslation} from 'react-i18next'
import {TakePhoto} from '../../../Components/TakePhoto'

export const UploadAvatarFromCamera = ({imgUrl, loading, size, onChange}) => {
    const {t} = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={t('take_picture')}
                component={<TakePhoto sendPhoto={onChange} onClose={() => setModalIsOpen(false)} />}
            />
            <UploadAvatarWrapper onClick={() => setModalIsOpen(true)}>
                <AvatarWrapper>
                    <StyledUploadAvatar
                        src={imgUrl}
                        size={size || 60}
                    >
                        {
                            !imgUrl && (
                                <>
                                    {
                                        loading
                                            ? <CircularProgress size={48}/>
                                            : <PersonalFillSvg/>
                                    }
                                </>
                            )
                        }
                    </StyledUploadAvatar>
                    <AvatarInnerIconWrapper>
                        <IconBox>
                            <UploadCloudSvg/>
                        </IconBox>
                    </AvatarInnerIconWrapper>
                </AvatarWrapper>
            </UploadAvatarWrapper>
        </>
    )
}
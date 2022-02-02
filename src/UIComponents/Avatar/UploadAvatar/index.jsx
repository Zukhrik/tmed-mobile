import React, {useRef} from 'react'
import {AvatarInnerIconWrapper, AvatarWrapper, StyledUploadAvatar, UploadAvatarWrapper,} from '../style'
import {IconBox} from '../../GlobalStyles'
import {UploadCloudSvg} from '../../../Icons/UploadCloud'
import {PersonalFillSvg} from '../../../Icons/PersonalFill'
import {CircularProgress} from '@material-ui/core'
import {fileToBase64, resizeFile} from '../../../utils/crop-utils'

export const UploadAvatar = ({imgUrl, size, onChange, loading}) => {
    const inputRef = useRef(null)
    const handleChange = async (e) => {
        const file = e.target.files[0]
        try {
            const resizedFile = await resizeFile(file, file.type, 'file')
            const imgUrl = await fileToBase64(resizedFile)
            const params = {
                imgUrl,
                file
            }
            onChange(params)
        } catch (e) {
        }
    }
    return (
        <>
            <UploadAvatarWrapper onClick={() => inputRef.current.click()}>
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
                <input
                    onChange={handleChange}
                    ref={inputRef}
                    type='file'
                    accept='image/png, image/jpeg'
                    style={{display: 'none'}}
                />
            </UploadAvatarWrapper>
        </>
    )
}
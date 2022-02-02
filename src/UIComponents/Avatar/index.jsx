import React from 'react'
import {UploadAvatar} from './UploadAvatar'
import {CommonAvatar} from './CommonAvatar'

export const Avatar = ({type, size, imgUrl, active, shape, height, disableLazyLoad, isOfficial}) => {

    return (
        <>
            {
                type === 'upload'
                    ? <UploadAvatar
                        size={size}
                        shape={shape}
                        active={active}
                        imgUrl={imgUrl}
                        height={height}
                        disableLazyLoad
                    />
                    : <CommonAvatar
                        size={size}
                        shape={shape}
                        imgUrl={imgUrl}
                        active={active}
                        height={height}
                        disableLazyLoad
                    />
            }
        </>
    )
}
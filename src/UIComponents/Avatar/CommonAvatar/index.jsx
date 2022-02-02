import React from 'react'
import {StyledAvatar} from '../style'
import {ImageLazyLoad} from '../../ImageLazyLoad'

export const CommonAvatar = ({size, imgUrl, shape, active, height, width, disableLazyLoad}) => {
    return (
        <StyledAvatar
            src={
                disableLazyLoad
                    ? imgUrl
                    : (
                        <ImageLazyLoad
                            alt='avatar-image'
                            height={height}
                            width={width}
                            src={imgUrl}
                        />
                    )
            }
            active={active}
            size={size || 60}
            shape={shape || null}
        />
    )
}
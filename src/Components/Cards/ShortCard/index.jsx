import React from 'react'
import {Link} from 'react-router-dom'
import {OfficialSvg} from '../../../Icons/Official'
import {Avatar} from '../../../UIComponents/Avatar'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {useHistory} from 'react-router-dom/cjs/react-router-dom'
import {CardImgWrapper, CardWrapInfo, ShortCardContainer} from './style'

export const ShortCard = (
    {
        name,
        text,
        path,
        active,
        imgUrl,
        imgSize,
        imgPath,
        nameSize,
        textSize,
        direction,
        isOfficial,
        uploadAvatar,
        containerPath,
        disableLazyLoad
    }
) => {
    const {push} = useHistory()
    
    function handlePush() {
        push(containerPath)
    }
    
    return (
        <ShortCardContainer direction={direction} onClick={handlePush}>
            <CardImgWrapper style={{margin: !name && !text && 0}}>
                {
                    imgPath ? (
                        <Link to={imgPath}>
                            <Avatar
                                imgUrl={imgUrl}
                                size={imgSize || 40}
                                active={active ? 1 : 0}
                                type={uploadAvatar && 'upload'}
                                disableLazyLoad={disableLazyLoad}
                            />
                        </Link>
                    ) : (
                        <Avatar
                            imgUrl={imgUrl}
                            size={imgSize || 40}
                            active={active ? 1 : 0}
                            type={uploadAvatar && 'upload'}
                            disableLazyLoad={disableLazyLoad}
                        />
                    )
                }
                {isOfficial && <OfficialSvg/>}
            </CardImgWrapper>
            <CardWrapInfo>
                <Title level={nameSize ? nameSize : 5}>
                    {
                        name && (
                            <>
                                {
                                    path
                                        ? <Link to={path}>
                                            <span>{name}</span>
                                        </Link>
                                        : <span>{name}</span>
                                }
                            </>
                        )
                    }
                </Title>
                <Text level={textSize ? textSize : ''}>
                    {
                        !!text &&
                        <span>{text}</span>
                    }
                </Text>
            </CardWrapInfo>
        </ShortCardContainer>
    )
}
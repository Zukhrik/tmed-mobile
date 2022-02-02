import React, {useState} from 'react'
import Carousel from 'react-multi-carousel'
import {useTranslation} from 'react-i18next'
import {truncateString} from '../../../../utils/stringUtils'
import {Text} from '../../../../UIComponents/Typography/Text'
import {ImageLazyLoad} from '../../../../UIComponents/ImageLazyLoad'
import {CommonPostWrapper, PostDescriptionWrapper, PostImagesWrapper} from '../../style'

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
}

export const CommonPost = ({post, mediaData, repostText}) => {
    const [show, setShow] = useState(false)
    const {t} = useTranslation()
    
    return (
        <CommonPostWrapper>
            {
                repostText && (
                    <PostDescriptionWrapper>
                        <Text>{repostText}</Text>
                    </PostDescriptionWrapper>
                )
            }
            {
                post?.trim().length > 0 && (
                    <PostDescriptionWrapper>
                        {
                            !show
                                ? (
                                    <Text>
                                        {truncateString(post, 150)}
                                        {post && post.length > 150 &&
                                            <span onClick={() => setShow(!show)}>{t('more')}</span>}
                                    </Text>
                                )
                                : (
                                    <Text>
                                        {post}
                                        <span onClick={() => setShow(!show)}>{t('hide')}</span>
                                    </Text>
                                )
                        }
                    </PostDescriptionWrapper>
                )
            }
            <PostImagesWrapper>
                {
                    mediaData && (
                        <>
                            {
                                mediaData.length === 1
                                    ? (
                                        <>
                                            {
                                                mediaData[0]?.thumbnail && !mediaData[0]?.file
                                                    ? <ImageLazyLoad
                                                        src={mediaData[0]?.thumbnail}
                                                        alt={mediaData[0]?.thumbnail}
                                                    />
                                                    : <video
                                                        controls
                                                        autoPlay
                                                        playsInline
                                                        muted
                                                        loop
                                                    >
                                                        <source src={mediaData[0]?.file}/>
                                                    </video>
                                            }
                                        </>
                                    )
                                    : (
                                        <Carousel
                                            arrows={false}
                                            responsive={responsive}
                                            renderButtonGroupOutside
                                            itemClass='offering-gallery-item'
                                            showDots={mediaData.length > 1}
                                        >
                                            {
                                                mediaData.map((item, idx) => (
                                                    <div key={`${idx + 1}`}>
                                                        {
                                                            item.thumbnail && !item.file && (
                                                                <ImageLazyLoad
                                                                    src={item.thumbnail}
                                                                    alt={item.thumbnail}
                                                                    height='auto'
                                                                />
                                                            )
                                                        }
                                                        {
                                                            item.file && !item.thumbnail && (
                                                                <video controls>
                                                                    <source src={item.file}/>
                                                                </video>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    )
                            }
                        </>
                    )
                }
            </PostImagesWrapper>
        </CommonPostWrapper>
    )
}
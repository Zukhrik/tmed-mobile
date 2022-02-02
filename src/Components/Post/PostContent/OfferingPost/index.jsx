import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {truncateString} from '../../../../utils/stringUtils'
import {Text} from '../../../../UIComponents/Typography/Text'
import {ImageLazyLoad} from '../../../../UIComponents/ImageLazyLoad'
import {PostDescriptionWrapper, PostImagesWrapper} from '../../style'

export const OfferingPost = ({data}) => {
    const {t} = useTranslation()
    const [show, setShow] = useState(false)
    
    return (
        <>
            <PostImagesWrapper>
                {
                    data && data.medias.length > 0 && (
                        <ImageLazyLoad
                            src={data.medias.thumbnail}
                            alt={data.medias.thumbnail}
                        />
                    )
                }
            </PostImagesWrapper>
            <PostDescriptionWrapper>
                {
                    !show
                        ? (
                            <Text>
                                {truncateString(data.text, 150)}
                                {data.text.length > 150 && <span onClick={() => setShow(!show)}> {t('more')}</span>}
                            </Text>
                        ) : (
                            <Text>
                                {data.text}
                                <span onClick={() => setShow(!show)}> {t('hide')}</span>
                            </Text>
                        )
                }
            </PostDescriptionWrapper>
        </>
    )
}
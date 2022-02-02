import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {truncateString} from '../../../utils/stringUtils'
import {Title} from '../../../UIComponents/Typography/Title'

export const PostDescription = ({title, description}) => {
    const {t} = useTranslation()
    const [hideText, setHideText] = useState(false)
    
    return (
        <>
            {
                title && (
                    <Title>{title}</Title>
                )
            }
            {
                !hideText
                    ? (
                        <Text>
                            {truncateString(description, 150)}
                            {
                                description && description.length > 150 &&
                                <span
                                    className='more-text'
                                    onClick={() => setHideText(!hideText)}
                                >
                                    {t('more')}
                                </span>
                            }
                        </Text>
                    )
                    : (
                        <Text>
                            {description}
                            <span
                                className='more-text'
                                onClick={() => setHideText(!hideText)}
                            >
                                {t('hide')}
                            </span>
                        </Text>
                    )
            }
        </>
    )
}
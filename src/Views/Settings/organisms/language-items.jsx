import React from 'react'
import {languages} from '../../../data'
import {LanguagesWrapper} from '../atoms'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from '@material-ui/core'
import {Text} from '../../../UIComponents/Typography/Text'
import {updateAccountMount} from '../../../Models/account-model'

export const LanguageItems = () => {
    const {t} = useTranslation()
    
    const handleClick = (lang) => {
        const data = {lang}
        updateAccountMount({data})
    }
    
    return (
        <ButtonGroup
            variant='text'
            orientation='vertical'
            aria-label='vertical outlined button group'
        >
            {
                languages.map((item, idx) => (
                    <Button
                        key={`${idx + 1}`}
                        onClick={() => handleClick(item.code)}
                    >
                        <LanguagesWrapper>
                            <Text>
                                {`${t(item.language)}`}
                            </Text>
                            <div className='current-lang'>
                                <Text>
                                    {`${t(item.text)}`}
                                </Text>
                            </div>
                        </LanguagesWrapper>
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}
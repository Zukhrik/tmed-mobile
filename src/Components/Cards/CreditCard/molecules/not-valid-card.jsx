import React from 'react'
import {NotValidCardWrapper} from '../atoms'
import {Text} from '../../../../UIComponents/Typography/Text'
import {useTranslation} from 'react-i18next'

export const NotValidCard = ({handleActivate}) => {
    const {t} = useTranslation()
    
    return (
        <NotValidCardWrapper
            onClick={handleActivate}
        >
            <Text>{t('activate')}</Text>
        </NotValidCardWrapper>
    )
}
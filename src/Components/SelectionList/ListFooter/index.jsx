import React from 'react'
import {SelectionListFooter} from '../style'
import {useTranslation} from 'react-i18next'
import {Button} from '../../../UIComponents/Button'

export const ListFooter = ({handleAccept, onClose, formik}) => {
    const {t} = useTranslation()
    
    return (
        <SelectionListFooter>
            <Button
                onClick={onClose}
                size='l'
            >
                {t('undo')}
            </Button>
            <Button
                size='l'
                variant='primary'
                onClick={handleAccept}
            >
                {t('apply')}
            </Button>
        </SelectionListFooter>
    )
}
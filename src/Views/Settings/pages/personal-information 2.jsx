import React, {useCallback, useState} from 'react'
import {LISTS} from '../../../Constants'
import {InformationForm} from '../organisms'
import {useTranslation} from 'react-i18next'
import {Modal} from '../../../UIComponents/Modal'
import {useProfileInfo} from '../../../Hooks/account'
import {useCurrencies, useGoBack} from '../../../Hooks/app'
import {FixedHeader} from '../../../Components/FixedHeader'
import {SelectionList} from '../../../Components/SelectionList'
import {RootContent} from '../../../UIComponents/GlobalStyles'


export const PersonalInformation = () => {
    useCurrencies()
    const {t} = useTranslation()
    const {formik} = useProfileInfo()
    const {goBack} = useGoBack('/settings/account')
    const [listType, setListType] = useState(LISTS.USER_CATEGORY)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    const getTitle = useCallback(() => {
        let tmp = ''
        if (listType === LISTS.USER_CATEGORY) {
            tmp = 'category'
        }
        
        if (listType === LISTS.REGION) {
            tmp = 'region'
        }
        
        return tmp
    }, [listType])
    
    const handleClick = (listType) => {
        setListType(listType)
        setModalIsOpen(true)
    }
    
    
    return (
        <RootContent
            paddingTop='50px'
            height='100vh'
            paddingBottom='60px'
        >
            <Modal
                centered
                modalIsOpen={modalIsOpen}
                title={t(`${getTitle()}`)}
                setModalIsOpen={setModalIsOpen}
                component={
                    <SelectionList
                        listType={listType}
                        onClose={() => setModalIsOpen(false)}
                        onChange={(value) => formik.setFieldValue(getTitle(), value)}
                    />
                }
            />
            <FixedHeader
                title={t('personal_information')}
                goBack={goBack}
            />
            <InformationForm
                formik={formik}
                handleClick={handleClick}
            />
        </RootContent>
    )
}
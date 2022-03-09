import React, {useCallback, useState} from 'react'
import {Col, Row} from 'antd'
import {langData} from '../../../data'
import {LISTS} from '../../../Constants'
import {useParams} from 'react-router-dom'
import {useGoBack} from '../../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {AboutAccountWrapper} from '../atoms'
import {ProfileSvg} from '../../../Icons/People'
import {Modal} from '../../../UIComponents/Modal'
import {Button} from '../../../UIComponents/Button'
import {Avatar} from '../../../UIComponents/Avatar'
import {useProfileInfo} from '../../../Hooks/account'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {FixedHeader} from '../../../Components/FixedHeader'
import {SelectionList} from '../../../Components/SelectionList'
import {IconBox, RootContent} from '../../../UIComponents/GlobalStyles'


export const AccountInformationPage = () => {
    const {formik} = useProfileInfo()
    const {t} = useTranslation()
    const {username} = useParams()
    const [listType, setListType] = useState(LISTS.USER_CATEGORY)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {goBack} = useGoBack({pathname: `/@${username}`})
    
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
        <RootContent paddingTop={50}>
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
                goBack={goBack}
                title={t('about_me')}
            />
            <AboutAccountWrapper onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 12]} className='padding-bottom'>
                    <Col span={24} className='change-photo'>
                        {
                            formik?.values?.avatar
                                ? (
                                    <Avatar
                                        size={96}
                                        imgUrl={formik?.values?.avatar}
                                    />
                                ) : (
                                    <IconBox color='var(--grey-dwed)'>
                                        <ProfileSvg/>
                                    </IconBox>
                                )
                        }
                        {/*<Text color='var(--primary-dwed)'>*/}
                        {/*    {t('change_profile_photo')}*/}
                        {/*</Text>*/}
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='name'
                            disabled
                            label={t('name')}
                            value={formik?.values?.name}
                            onChange={(e) => formik.setFieldValue('name', e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            disabled
                            name='lastname'
                            label={t('lastname')}
                            value={formik?.values?.lastname}
                            onChange={(e) => formik.setFieldValue('lastname', e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            disabled
                            name='surname'
                            inputType='text'
                            label={t('surname')}
                            value={formik?.values?.surname}
                            onChange={(e) => formik.setFieldValue('surname', e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            disabled
                            name='date'
                            inputType='date'
                            value={formik?.values?.birthday}
                            label={t('birthday')}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='language'
                            inputType='select'
                            value={formik.values.user_lang}
                            label={t('language')}
                            options={langData}
                            onChange={(e) => formik.setFieldValue('user_lang', e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='category'
                            label={t('category')}
                            icon={<ArrowIosBottomSvg/>}
                            value={formik?.values?.category?.name || ''}
                            onClick={() => handleClick(LISTS.USER_CATEGORY)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='region'
                            label={t('region')}
                            icon={<ArrowIosBottomSvg/>}
                            value={formik?.values?.region?.name || ''}
                            onClick={() => handleClick(LISTS.REGION)}
                        />
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant='primary'
                            htmlType='submit'
                        >
                            {t('save')}
                        </Button>
                    </Col>
                </Row>
            </AboutAccountWrapper>
        </RootContent>
    )
}
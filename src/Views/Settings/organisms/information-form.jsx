import React from 'react'
import {Col, Row} from 'antd'
import {LISTS} from '../../../Constants'
import {useTranslation} from 'react-i18next'
import {SettingsContentWrapper} from '../atoms'
import {Button} from '../../../UIComponents/Button'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {Text} from '../../../UIComponents/Typography/Text'

export const InformationForm = ({formik, handleClick}) => {
    const {t} = useTranslation()
    
    return (
        <SettingsContentWrapper>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[16, 24]}>
                    <Col span={24}>
                        <Text>Provide your personal information. This won't be a part of your public profile.</Text>
                    </Col>
                    {/*<Col span={24}>*/}
                    {/*    <InputUI*/}
                    {/*        inputType='select'*/}
                    {/*        value={formik.values.user_lang}*/}
                    {/*        label={t('language')}*/}
                    {/*        options={langData}*/}
                    {/*        onChange={(e) => formik.setFieldValue('user_lang', e.target.value)}*/}
                    {/*    />*/}
                    {/*</Col>*/}
                    
                    <Col span={24}>
                        <InputUI
                            disabled
                            name='phone'
                            label={t('phone_number')}
                            value={formik?.values?.phone && `+${formik?.values?.phone}`}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            disabled
                            inputType='text'
                            label={t('email')}
                            value={formik?.values?.email}
                            onChange={(e) => formik.setFieldValue('email', e.target.value)}
                        />
                    </Col>
                    
                    {/*<Col span={24}>*/}
                    {/*    <InputUI*/}
                    {/*        inputType='select'*/}
                    {/*        value={formik.values.gender}*/}
                    {/*        label={t('gender')}*/}
                    {/*        options={genderType}*/}
                    {/*        onChange={(e) => formik.setFieldValue('gender', e.target.value)}*/}
                    {/*    />*/}
                    {/*</Col>*/}
                    
                    <Col span={24}>
                        <InputUI
                            disabled
                            inputType='date'
                            value={formik?.values?.birthday}
                            label={t('birthday')}
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
                    <Col span={24}>
                        <Button
                            variant='primary'
                            size='l'
                            htmlType='submit'
                        >
                            {t('save')}
                        </Button>
                    </Col>
                </Row>
            </form>
        </SettingsContentWrapper>
    )
}
import React from 'react'
import {Col, Row} from 'antd'
import {useLegalVerifying} from '../../../Hooks/verifying'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {useTranslation} from 'react-i18next'
import {SimpleImageUpload, UploadFromCamera} from '../../UploadMedia'
import {Button} from '../../../UIComponents/Button'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {UploadAvatarFromCamera} from '../../../UIComponents/Avatar/UploadAvatarFromCamera'
import {UploadAvatar} from '../../../UIComponents/Avatar/UploadAvatar'
import {StyledErrorText} from '../../../UIComponents/Inputs/style'

export const LegalDataVerifying = () => {
    const {formik, disabled, uploadBusinessAvatar, uploadLoading} = useLegalVerifying()
    const {t} = useTranslation()
    const {push} = useHistory()
    const {$device} = useStore($appModel)

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[24, 24]}>
                <Col span={24} style={{marginBottom: $device && $device === INFO_MAT && 40}}>
                    {
                        $device && $device === INFO_MAT
                            ? <UploadAvatarFromCamera
                                size={250}
                                imgUrl={formik.values.business_ava && formik.values.business_ava.imgUrl}
                                onChange={uploadBusinessAvatar}
                                loading={uploadLoading}
                            />
                            : (
                                <>
                                    <UploadAvatar
                                        size={140}
                                        imgUrl={formik.values.business_ava && formik.values.business_ava.imgUrl}
                                        onChange={uploadBusinessAvatar}
                                        loading={uploadLoading}
                                    />
                                    {
                                        formik.touched.business_ava && formik.errors.business_ava
                                        && (
                                            <StyledErrorText>{formik.errors.business_ava}</StyledErrorText>
                                        )
                                    }
                                </>
                            )
                    }
                </Col>
                <Col span={$device && $device === INFO_MAT ? 12 : 24}>
                    <InputUI
                        inputType='masked'
                        mask='aa'
                        name='passport_series'
                        onBlur={formik.handleBlur}
                        label={t('passport_series')}
                        value={formik.values.passport_series}
                        error={formik.touched.passport_series && formik.errors.passport_series}
                        onChange={(e) => formik.setFieldValue('passport_series', e.target.value.toUpperCase())}
                    />
                </Col>
                <Col span={$device && $device === INFO_MAT ? 12 : 24}>
                    <InputUI
                        type='number'
                        name='passport_number'
                        onBlur={formik.handleBlur}
                        label={t('passport_number')}
                        onChange={formik.handleChange}
                        value={formik.values.passport_number}
                        error={formik.touched.passport_number && formik.errors.passport_number}
                    />
                </Col>
                <Col span={24}>
                    {
                        $device && $device === INFO_MAT
                            ? (
                                <UploadFromCamera
                                    onChange={(value) => formik.setFieldValue('passport_scan', value)}
                                    value={formik.values.passport_scan}
                                    error={formik.touched.passport_scan && formik.errors.passport_scan}
                                />
                            )
                            : (
                                <SimpleImageUpload
                                    label={t('passport_scan')}
                                    value={formik.values.passport_scan}
                                    onChange={(value) => formik.setFieldValue('passport_scan', value)}
                                    error={formik.touched.passport_scan && formik.errors.passport_scan}
                                    onBlur={() => formik.setFieldTouched('passport_scan', true, true)}
                                />
                            )
                    }
                </Col>
                <Col span={24}>
                    <Row gutter={24} justify='center'>
                        <Col span='auto'>
                            <Button variant='link' size='l' onClick={() => push('/menu')}>
                                {t('cancel')}
                            </Button>
                        </Col>
                        <Col span='auto'>
                            <Button
                                htmlType='submit'
                                size='l'
                                variant='primary'
                                disabled={disabled()}
                                loading={formik.isSubmitting}
                            >
                                {t('continue')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}
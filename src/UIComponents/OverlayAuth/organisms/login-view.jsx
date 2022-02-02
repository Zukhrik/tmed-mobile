import React from 'react'
import {Col, Row} from 'antd'
import {Button} from '../../Button'
import {InputUI} from '../../mu-inputs'
import {Text} from '../../Typography/Text'
import {useHistory} from 'react-router-dom'
import {Title} from '../../Typography/Title'
import {useFastAuth} from '../../../Hooks/auth'
import {RefreshSvg} from '../../../Icons/refresh'
import {Trans, useTranslation} from 'react-i18next'
import {CountdownWrapper, StyledCountdown} from '../../../Views/Auth/style'

export const LoginView = ({onClose, action}) => {
    const {
        phone,
        formik,
        resend,
        nextStep,
        deadline,
        onFinish,
        showResend,
        handleChange,
        disabledButton
    } = useFastAuth({onClose, action})
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <>
            {
                nextStep
                    ? <form onSubmit={formik.handleSubmit}>
                        <Row gutter={[0, 24]}>
                            <Col span={24}>
                                <Title weight={500}>{t('SMS_confirmation')}</Title>
                            </Col>
                            <Col span={24}>
                                <Text>
                                    <Trans i18nKey='verify_code_sentence'>
                                        {{phone}}
                                        <br/>
                                    </Trans>
                                </Text>
                            </Col>
                            <Col span={24}>
                                <InputUI
                                    type='tel'
                                    pattern='[0-9]*'
                                    mask='9 9 9 9 9 9'
                                    inputType='masked'
                                    name='activation_code'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label={t('verification_code')}
                                    values={formik.values.activation_code}
                                    error={formik.touched.activation_code && formik.errors.activation_code}
                                />
                            </Col>
                            {
                                showResend
                                    ? <Button
                                        onClick={() => resend()}
                                        size='l'
                                        style={{boxShadow: 'unset', color: 'var(--dark-dwed)'}}
                                    >
                                        <RefreshSvg/>
                                        {t('send_again')}
                                    </Button>
                                    : <CountdownWrapper padding='0'>
                                        <Trans i18nKey='get_code_sentence'>
                                            <StyledCountdown value={deadline} format='s' onFinish={onFinish}/>
                                        </Trans>
                                    </CountdownWrapper>
                            }
                            <Col span={24}>
                                <Button
                                    size='l'
                                    variant='primary'
                                    htmlType='submit'
                                    disabled={
                                        (formik.touched.activation_code && !!formik.errors.activation_code)
                                        || !formik.values.activation_code.match(/^(\d\s*){6}$/)
                                    }
                                >
                                    {t('enter')}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                    
                    : <form onSubmit={formik.handleSubmit}>
                        <Row gutter={[0, 24]}>
                            <Col span={24}>
                                {t('enter_ur_phone_number')}
                            </Col>
                            <Col span={24}>
                                <InputUI
                                    name='phone'
                                    pattern='[0-9]*'
                                    inputType='phone'
                                    value={formik.values.phone ? formik.values.phone.value : ''}
                                    onBlur={formik.handleBlur}
                                    onChange={(value, {countryCode}) => handleChange('phone', {value, countryCode})}
                                    error={formik.touched.phone && formik.errors.phone}
                                />
                            </Col>
                            <Col span={24}>
                                <Button
                                    size='l'
                                    variant='primary'
                                    htmlType='submit'
                                    disabled={disabledButton()}
                                    loading={formik.isSubmitting}
                                >
                                    {t('get_code')}
                                </Button>
                            </Col>
                            <Col span={24}>
                                <Text
                                    level={4}
                                    alignType='center'
                                    onClick={() => push('/sign-in')}
                                >
                                    {t('enter_by_login')}
                                </Text>
                            </Col>
                        </Row>
                    </form>
            }
        </>
    )
}
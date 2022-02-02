import React from 'react'
import {
    AuthContainer,
    AuthForm,
    ConfirmButtonsWrapper,
    CountdownWrapper,
    ImageWrapper,
    LinkToWrapper,
    StyledCountdown
} from '../../style'
import {Col, Row} from 'antd'
import {Trans, useTranslation} from 'react-i18next'
import {Link, useLocation} from 'react-router-dom'
import {usePhoneVerify} from '../../../../Hooks/auth'
import {Button} from '../../../../UIComponents/Button'
import {URL_KEYS, URL_VALUES} from '../../../../Constants'
import {InputUI} from '../../../../UIComponents/mu-inputs'
import {PhoneVerifySvg} from '../../../../Icons/PhoneVerify'
import {Title} from '../../../../UIComponents/Typography/Title'
import {Container} from '../../../../UIComponents/GlobalStyles'

export const PhoneVerifyForm = () => {
    const {formik, phone, deadline, onFinish, resend, showResend} = usePhoneVerify()
    const {t} = useTranslation()
    const {state} = useLocation()

    return (
        <AuthContainer>
            <ImageWrapper>
                <Title level={3}>{t('SMS_confirmation')}</Title>
                <PhoneVerifySvg/>
            </ImageWrapper>
            <AuthForm onSubmit={formik.handleSubmit}>
                <Row gutter={[16, 24]}>
                    <Col span={24}>
                       <Container>
                           <Title alignType={'center'} level={5}>
                               <Trans i18nKey='verification_code_sentence'>
                                   {{phone}}
                                   <br/>
                               </Trans>
                           </Title>
                       </Container>
                    </Col>
                    <Col span={24}>
                        <Container>
                            <InputUI
                                mask='9 9 9 9 9 9'
                                variant='outlined'
                                inputType='masked'
                                name='activation_code'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('verification_code')}
                                values={formik.values.activation_code}
                                error={formik.touched.activation_code && formik.errors.activation_code}
                                staticError
                            />
                        </Container>
                        {
                            !showResend
                            && (
                                <CountdownWrapper>
                                    <Trans i18nKey='get_code_sentence'>
                                        <StyledCountdown value={deadline} format='s' onFinish={onFinish}/>
                                    </Trans>
                                </CountdownWrapper>
                            )
                        }
                    </Col>
                    <Col span={24}>
                        <ConfirmButtonsWrapper>
                            <Button
                                size='l'
                                variant='primary'
                                htmlType='submit'
                                disabled={
                                    (formik.touched.activation_code && !!formik.errors.activation_code)
                                    || !formik.values.activation_code.match(/^(\d\s*){6}$/)
                                    || showResend
                                }
                            >
                                {t('confirm')}
                            </Button>
                            {
                                showResend
                                && (
                                    <Button
                                        onClick={resend}
                                        size='l'
                                        style={{boxShadow: 'unset', color: 'var(--dark-dwed)'}}
                                    >
                                        {t('send_again')}
                                    </Button>
                                )
                            }
                        </ConfirmButtonsWrapper>
                    </Col>
                </Row>
            </AuthForm>
            <LinkToWrapper style={{marginTop: 30}}>
                <Link
                    to={{
                        pathname: '/sign-up',
                        search: `${URL_KEYS.STEP}=${URL_VALUES.CHANGE_PHONE}`,
                        state
                    }}
                >
                    {t('change_phone_number')}
                </Link>
            </LinkToWrapper>
        </AuthContainer>
    )
}
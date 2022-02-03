import React from 'react'
import {Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useSignIn} from '../../../Hooks/auth'
import {CloseSvg} from '../../../Icons/Close'
import {Button} from '../../../UIComponents/Button'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {Text} from '../../../UIComponents/Typography/Text'
import {
    AuthAction,
    AuthCloseBtnWrap,
    AuthContainer,
    AuthForm,
    ImageWrapper,
    LinkToWrapper,
    SignInWrapper,
    WelcomeWrapper
} from '../style'
import {LogoSvg} from '../../../Icons/Logo'
import {Title} from '../../../UIComponents/Typography/Title'

export default () => {
    const {t} = useTranslation()
    const {formik, disabled} = useSignIn()
    
    return (
        <SignInWrapper>
            <AuthContainer height='100vh'>
                <AuthCloseBtnWrap
                    to='/'
                    style={{transform: 'unset', right: 12, top: 12, width: 24}}
                >
                    <CloseSvg/>
                </AuthCloseBtnWrap>
                <ImageWrapper>
                    <LogoSvg/>
                    <WelcomeWrapper>
                        <Title>{t('welcome')}</Title>
                        <Text>{t('enter_phone_number')}</Text>
                    </WelcomeWrapper>
                </ImageWrapper>
                <AuthForm onSubmit={formik.handleSubmit}>
                    <Row gutter={[0, 24]} style={{marginBottom: 0}}>
                        <Col span={24} className='container'>
                            <InputUI
                                name='username'
                                label={t('login')}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                onChange={(e) => formik.setFieldValue('username', e.target.value.toLowerCase())}
                                // icon={<IconBox><PersonalFillSvg/></IconBox>}
                                error={formik.touched.username && formik.errors.username}
                            />
                        </Col>
                        <Col span={24} className='container'>
                            <InputUI
                                name='password'
                                type='password'
                                // icon={<LockFillSvg/>}
                                onBlur={formik.handleBlur}
                                label={t('password')}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password}
                            />
                        </Col>
                        <Col span={24} style={{paddingBottom: 0}} className='container'>
                            <Button
                                size='l'
                                variant='primary'
                                htmlType='submit'
                                disabled={disabled()}
                                loading={formik.isSubmitting}
                            >
                                {t('enter')}
                            </Button>
                        </Col>
                        <Col span={24}>
                            <AuthAction justifyContent='center'>
                                <Text>{t('forgot_your_password?')}</Text>
                            </AuthAction>
                        </Col>
                    </Row>
                </AuthForm>
                <LinkToWrapper marginTop='24px'>
                    <Text
                        size={12}
                        color='var(--default-white)'
                    >
                        {t('i_have_no_account')}
                        <Link to={'/sign-up'}>
                            {t('sign_up')}
                        </Link>
                    </Text>
                </LinkToWrapper>
            </AuthContainer>
        </SignInWrapper>
    )
}
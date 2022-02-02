import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Checkbox, Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {CloseSvg} from '../../../../Icons/Close'
import {AlertCircleSvg} from '../../../../Icons/Alert'
import {Button} from '../../../../UIComponents/Button'
import {useCreateAccount} from '../../../../Hooks/auth'
import {InputUI} from '../../../../UIComponents/mu-inputs'
import {CheckMarkCircleSvg} from '../../../../Icons/CheckMark'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Title} from '../../../../UIComponents/Typography/Title'
import {AuthAction, AuthContainer, AuthForm, LinkToWrapper} from '../../style'
import {IconBox} from '../../../../UIComponents/GlobalStyles'


export const RegisterForm = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {formik, handleChange, usernameStatus, handleUsernameChange} = useCreateAccount()
    
    const renderIcon = () => {
        switch (usernameStatus) {
            case 1:
                return <CheckMarkCircleSvg style={{color: '#00E096'}}/>
            case 0:
                return <AlertCircleSvg style={{color: '#FF3D71'}}/>
            default:
                return <></>
        }
    }
    
    return (
        <AuthContainer>
            <AuthForm
                onSubmit={formik.handleSubmit}
            >
                <Row gutter={[0, 24]}>
                    <Col
                        span={24}
                        className='auth-form-label'
                    >
                        <Row justify='space-between' align='middle'>
                            <Col>
                                <Title
                                    weight={500}
                                >
                                    {t('user_registration')}
                                </Title>
                            </Col>
                            <Col onClick={() => push('/')}>
                                <IconBox>
                                    <CloseSvg/>
                                </IconBox>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            name='username'
                            icon={renderIcon()}
                            label={t('login')}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            error={formik.touched.username && formik.errors.username}
                        />
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            name='name'
                            label={t('name')}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            name='lastname'
                            label={t('lastname')}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                            error={formik.touched.lastname && formik.errors.lastname}
                            onChange={(e) => handleChange('lastname', e.target.value)}
                        />
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            name='phone'
                            inputType='phone'
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            onChange={(e) => handleChange('phone', e)}
                            error={formik.touched.phone && formik.errors.phone}
                        />
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            name='password'
                            inputType='password'
                            onBlur={formik.handleBlur}
                            label={t('password')}
                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                        />
                    </Col>
                    <Col span={24} className='container'>
                        <InputUI
                            inputType='password'
                            name='confirmPassword'
                            onBlur={formik.handleBlur}
                            label={t('confirm_password')}
                            value={formik.values.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </Col>
                    <Col span={24}>
                        <AuthAction alignType='flex-end'>
                            <Text>
                                <Checkbox
                                    checked={formik.values.checkbox}
                                    onChange={(e) => formik.setFieldValue('checkbox', e.target.checked)}
                                >
                                    
                                    {t('i_accept_custom')}
                                </Checkbox>
                                <Link
                                    to='/'
                                >
                                    {t('agreement')}
                                </Link>
                            </Text>
                        </AuthAction>
                    </Col>
                    <Col span={24} style={{marginTop: 12}} className='container'>
                        <Button
                            size='l'
                            type='submit'
                            variant='primary'
                            htmlType='submit'
                            disabled={!formik.values.checkbox}
                        >
                            {t('register')}
                        </Button>
                    </Col>
                </Row>
            </AuthForm>
            <LinkToWrapper>
                <Text>
                    {t('already_have_an_account? ')}
                    <Link to={'/sign-in'}>
                        {t('enter')}
                    </Link>
                </Text>
            </LinkToWrapper>
        </AuthContainer>
    )
}
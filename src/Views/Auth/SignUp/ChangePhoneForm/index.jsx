import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {Button} from '../../../../UIComponents/Button'
import {useCreateAccount} from '../../../../Hooks/auth'
import {InputUI} from '../../../../UIComponents/mu-inputs'
import {ChangePhoneSvg} from '../../../../Icons/ChangePhone'
import {Title} from '../../../../UIComponents/Typography/Title'
import {AuthCloseBtnWrap, AuthContainer, AuthForm, ConfirmButtonsWrapper} from '../../style'
import {Container} from '../../../../UIComponents/GlobalStyles'
import {CloseSvg} from '../../../../Icons/Close'

export const ChangePhoneForm = () => {
    const {t} = useTranslation()
    const {formik} = useCreateAccount()
    
    return (
        <AuthContainer>
            <AuthCloseBtnWrap to='/' style={{marginTop: 23}}>
                <CloseSvg/>
            </AuthCloseBtnWrap>
            <AuthForm onSubmit={formik.handleSubmit}>
                <Row gutter={[16, 24]}>
                    <Col span={24} style={{marginBottom: 36}}>
                        <Row style={{position: 'relative'}}>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <Title
                                    level={4} weight={500}
                                    style={{fontSize: 18}}
                                >
                                    {t('change_phone_number')}
                                </Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{
                        color: 'var(--primary-dwed)',
                        marginBottom: 36,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ChangePhoneSvg/>
                    </Col>
                    <Col span={24}>
                        <Container>
                            <InputUI
                                type='text'
                                name='phone'
                                inputType='phone'
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                onChange={(value) => formik.setFieldValue('phone', value)}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                        </Container>
                    </Col>
                    <Col span={24}>
                        <ConfirmButtonsWrapper>
                            <Button
                                size='l'
                                variant='primary'
                                htmlType='submit'
                            >
                                {t('change')}
                            </Button>
                        </ConfirmButtonsWrapper>
                    </Col>
                </Row>
            </AuthForm>
        </AuthContainer>
    )
}
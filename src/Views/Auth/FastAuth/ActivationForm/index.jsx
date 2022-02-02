import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$appModel} from '../../../../Models/app'
import {CloseSvg} from '../../../../Icons/Close'
import {INFO_MAT} from '../../../../Constants/app'
import {Trans, useTranslation} from 'react-i18next'
import {RefreshSvg} from '../../../../Icons/refresh'
import {Button} from '../../../../UIComponents/Button'
import {InputUI} from '../../../../UIComponents/mu-inputs'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Title} from '../../../../UIComponents/Typography/Title'
import {Container} from '../../../../UIComponents/GlobalStyles'
import {AuthForm, CloseModalForm, CountdownWrapper, StyledCountdown} from '../../style'

export const ActivationForm = ({formik, onFinish, deadline, showResend, resend, phone, onClose}) => {
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    
    return (
        <AuthForm onSubmit={formik.handleSubmit} style={{position: 'relative'}}>
            {
                $device && $device === INFO_MAT && (
                    <CloseModalForm onClick={() => onClose()}>
                        <CloseSvg/>
                    </CloseModalForm>
                )
            }
            <Container>
                <Row gutter={[0, 24]} style={{marginBottom: 0}}>
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
            </Container>
        </AuthForm>
    )
}
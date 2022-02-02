import React from 'react'
import {Col, Row} from 'antd'
import {CreditCardDetailForm} from '../../style'
import {Trans, useTranslation} from 'react-i18next'
import {PayMeSvg} from '../../../../../Icons/PayMe'
import {StyledCountdown} from '../../../../Auth/style'
import {RefreshSvg} from '../../../../../Icons/refresh'
import {Button} from '../../../../../UIComponents/Button'
import {InputUI} from '../../../../../UIComponents/mu-inputs'
import {Title} from '../../../../../UIComponents/Typography/Title'

export const CreateCard = (
    {
        formik,
        cardId,
        deadline,
        resendCode,
        showResend,
        codeFormik,
        handleChange,
        setShowResend,
        disabledButton,
        handleChangeCode,
        disabledButtonCode
    }
) => {
    const {t} = useTranslation()
    
    return (
        <>
            {
                cardId
                    ? (
                        <CreditCardDetailForm onSubmit={codeFormik.handleSubmit}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <Title>{t('enter_code_activation')}</Title>
                                </Col>
                                <Col span={24}>
                                    <PayMeSvg/>
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        inputType='masked'
                                        name='activate_code'
                                        mask='9 9 9 9 9 9'
                                        label={t('code_activation')}
                                        maskChar='*'
                                        value={codeFormik.values.activate_code || ''}
                                        onBlur={codeFormik.handleBlur}
                                        onChange={(e) => handleChangeCode('activate_code', e.target.value)}
                                        error={codeFormik.touched.activate_code && codeFormik.errors.activate_code}
                                    />
                                </Col>
                                {
                                    showResend
                                        ? (
                                            <Col span={24}>
                                                <Button
                                                    size='l'
                                                    onClick={() => resendCode()}
                                                >
                                                    <RefreshSvg/>
                                                    {t('send_again')}
                                                </Button>
                                            </Col>
                                        )
                                        : (
                                            <Col span={24}>
                                                <Trans i18nKey='get_code_sentence'>
                                                    <StyledCountdown
                                                        format='s'
                                                        value={deadline}
                                                        onFinish={() => setShowResend(true)}
                                                    />
                                                </Trans>
                                            </Col>
                                        )
                                }
                                <Col span={24}>
                                    <Button
                                        size='l'
                                        variant='primary'
                                        htmlType='submit'
                                        disabled={disabledButtonCode()}
                                    >
                                        {t('confirm')}
                                    </Button>
                                </Col>
                            </Row>
                        </CreditCardDetailForm>
                    )
                    : (
                        <CreditCardDetailForm onSubmit={formik.handleSubmit}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <Title>{t('enter_bank_card_details')}</Title>
                                </Col>
                                <Col span={24}>
                                    <PayMeSvg/>
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        inputType='masked'
                                        mask='9999 9999 9999 9999'
                                        name='number'
                                        maskChar='*'
                                        onBlur={formik.handleBlur}
                                        label={t('enter_card_number')}
                                        value={formik.values.number || ''}
                                        onChange={(e) => handleChange('number', e.target.value)}
                                        error={formik.touched.number && formik.errors.number}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        name='expire_date'
                                        label={t('expiry_date')}
                                        inputType='keyboardDate'
                                        placeholder={t('MM/YY')}
                                        format='MM/YY'
                                        value={formik.values.expire_date || null}
                                        onBlur={formik.handleBlur}
                                        onChange={(value) => handleChange('expire_date', value)}
                                        error={formik.touched.expire_date && formik.errors.expire_date}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        name='name'
                                        label={t('card_name')}
                                        value={formik.values?.name || ''}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Button
                                        size='l'
                                        variant='primary'
                                        htmlType='submit'
                                        disabled={disabledButton()}
                                    >
                                        {t('add')}
                                    </Button>
                                </Col>
                            </Row>
                        </CreditCardDetailForm>
                    )
            }
        </>
    )
}
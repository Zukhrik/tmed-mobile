import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {CloseSvg} from '../../../../Icons/Close'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {AuthForm, CloseModalForm} from '../../style'
import {Button} from '../../../../UIComponents/Button'
import {InputUI} from '../../../../UIComponents/mu-inputs'
import {Text} from '../../../../UIComponents/Typography/Text'

export const PhoneForm = ({formik, handleChange, disabledButton, onClose}) => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    
    return (
        <AuthForm
            onSubmit={formik.handleSubmit}
            position='relative'
        >
            {
                $device && $device === INFO_MAT && (
                    <CloseModalForm onClick={() => onClose()}>
                        <CloseSvg/>
                    </CloseModalForm>
                )
            }
            <Row
                gutter={[0, 8]}
                className='container'
                style={{marginBottom: 0}}
            >
                <Col span={24} className='fast-auth-title'>
                    {t('welcome')}
                </Col>
                <Col span={24} className='fast-auth-label'>
                    {t('enter_ur_phone_number')}
                </Col>
                <Col span={24} className='fast-auth-input-wrapper'>
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
                <Col span={24} className='fast-auth-btn-wrapper'>
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
                {
                    $device && $device !== INFO_MAT
                        ? (
                            <Col span={24} className='fast-auth-input-wrapper'>
                                <Text
                                    level={4}
                                    alignType='center'
                                    onClick={() => push('/sign-in')}
                                >
                                    {t('enter_by_login')}
                                </Text>
                            </Col>
                        )
                        : (''
                            // <Col
                            //     span={24}
                            // >
                            //     <Text
                            //         alignType='center'
                            //         onClick={handleClickOnScan}
                            //     >
                            //         {t('scan_QR_Code')}
                            //     </Text>
                            // </Col>
                        )
                }
            </Row>
        </AuthForm>
    )
}
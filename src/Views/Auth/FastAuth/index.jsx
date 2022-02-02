import React from 'react'
import {PhoneForm} from './PhoneForm'
import {DWEDSvg} from '../../../Icons/DWED'
import {useFastAuth} from '../../../Hooks/auth'
import {ActivationForm} from './ActivationForm'
import {FastAuthWrapper, ImageWrapper} from '../style'

export default ({onClose, action}) => {
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
    
    return (
        <FastAuthWrapper>
            <ImageWrapper>
                <DWEDSvg/>
            </ImageWrapper>
            {
                nextStep
                    ? <ActivationForm
                        formik={formik}
                        resend={resend}
                        onClose={onClose}
                        phone={phone.value}
                        deadline={deadline}
                        onFinish={onFinish}
                        showResend={showResend}
                    />
                    : <PhoneForm
                        formik={formik}
                        onClose={onClose}
                        handleChange={handleChange}
                        disabledButton={disabledButton}
                    />
            }
        </FastAuthWrapper>
    )
}
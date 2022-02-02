import React, {useCallback, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {PhoneVerifyForm} from './PhoneVerify'
import {useUrlParams} from '../../../Hooks/app'
import {ChangePhoneForm} from './ChangePhoneForm'
import {RegisterForm} from './RegisterForm/index'
import {URL_KEYS, URL_VALUES} from '../../../Constants'

export default () => {
    const {urlData} = useUrlParams()
    const {push} = useHistory()
    
    const renderSignUpSteps = () => {
        switch (urlData[URL_KEYS.STEP]) {
            case URL_VALUES.CHANGE_PHONE:
                return <ChangePhoneForm/>
            case URL_VALUES.PHONE_VERIFY:
                return <PhoneVerifyForm/>
            default:
                return <RegisterForm/>
        }
    }
    
    const replace = useCallback(() => {
        push('/sign-up')
    }, [push])
    
    useEffect(() => {
        window.addEventListener('load', replace)
        return () => {
            window.removeEventListener('load', replace)
        }
    }, [replace])
    
    return (
        <>
            {renderSignUpSteps()}
        </>
    )
}
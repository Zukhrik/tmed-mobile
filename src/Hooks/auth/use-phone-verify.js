import * as Yup from 'yup'
import Cookies from 'js-cookie'
import {useFormik} from 'formik'
import jwtDecode from 'jwt-decode'
import auth from '../../Service/auth'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AsYouType} from 'libphonenumber-js'
import {tokenMount} from '../../Models/app'
import {useTranslation} from 'react-i18next'
import {getCurrentAccount} from '../../Models/account-model'

export const usePhoneVerify = () => {
    const [deadline, setDeadline] = useState(Date.now() + 1000 * 60)
    const [showResend, setShowResend] = useState(false)
    const [phone, setPhone] = useState(null)
    const {location, push} = useHistory()
    const {t} = useTranslation()
    
    const validationSchema = Yup.object().shape({
        activation_code: Yup.string()
            .required(t('required_field'))
            .test('regexTest', t('required_field'), (value) => {
                return value && value.match(/^(\d\s*){6}$/)
            })
    })
    
    const formik = useFormik({
        initialValues: {
            activation_code: ''
        },
        validationSchema,
        onSubmit: ({activation_code}) => {
            auth.activateCode({activation_code: activation_code.replace(/\s/g, '')})
                .then((res) => {
                    if (res) {
                        let users = {}
                        if (Cookies.get('users')) {
                            const oldUsers = JSON.parse(Cookies.get('users'))
                            users = {...oldUsers}
                        }
                        users[jwtDecode(res.data.access).username] = res.data
                        tokenMount(res.data.access)
                        Cookies.set('users', JSON.stringify(users))
                        Cookies.set('token', res.data.access)
                        Cookies.set('refresh-token', res.data.refresh)
                        getCurrentAccount()
                        push('/')
                    }
                })
        }
    })
    
    useEffect(() => {
        if (location.state && location.state.phone) {
            const p = new AsYouType('UZ').input(location.state.phone)
            setPhone(p)
        }
    }, [location.state])
    
    const onFinish = () => {
        setShowResend(true)
    }
    
    const resend = () => {
        if (location.state.phone) {
            auth.resendCode({phone: `+${location.state.phone}`})
                .then(() => {
                    setDeadline(Date.now() + 1000 * 60)
                    setShowResend(false)
                })
        }
    }
    
    return {
        phone,
        formik,
        resend,
        deadline,
        onFinish,
        showResend
    }
}
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import {useFormik} from 'formik'
import jwtDecode from 'jwt-decode'
import auth from '../../Service/auth'
import {useCallback, useState} from 'react'
import {tokenMount} from '../../Models/app'
import {useTranslation} from 'react-i18next'
import {isValidPhoneNumber} from 'libphonenumber-js'
import {getCurrentAccount} from '../../Models/account-model'
import {queryClient} from '../../App'

const values = {
    phone: null,
    activation_code: ''
}

export function useFastAuth({onClose, action}) {
    const {t} = useTranslation()
    const [initialValues] = useState(values)
    const [nextStep, setNextStep] = useState(false)
    const [showResend, setShowResend] = useState(false)
    const [deadline, setDeadline] = useState(Date.now() + 1000 * 120)
    
    const validationSchema = Yup.object().shape({
        phone: Yup.mixed()
            .test('phoneValidation', t('invalid_phone_number'), (data) => {
                if (data) {
                    const {value, countryCode} = data
                    return isValidPhoneNumber(value, countryCode)
                }
                return true
            })
            .required(t('required_field'))
    })
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const data = {phone: `${values.phone.value}`}
            
            if (nextStep && values.activation_code) {
                data.activation_code = values.activation_code.replace(/\s/g, '')
            }
            
            auth.createFastAuth(data)
                .then((res) => {
                    if (res) {
                        if (res.data.phone) {
                            setNextStep(true)
                        }
                        
                        if (res.data.access) {
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
                            queryClient.clear()
                            onClose()
                            if (action) {
                                action()
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => setSubmitting(false))
        }
    })
    
    const disabledButton = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.phone && !!formik.errors.phone)
        )
    }, [formik])
    
    const handleChange = (key, value) => {
        formik.setFieldValue(key, value)
    }
    
    const onFinish = () => {
        setShowResend(true)
    }
    
    const resend = useCallback(() => {
        auth.createFastAuth({phone: `+${formik.values.phone.value}`})
            .then((res) => {
                if (res) {
                    setDeadline(Date.now() + 1000 * 120)
                    setShowResend(false)
                }
            })
    }, [formik])
    let phone = formik.values.phone
    
    return {
        formik,
        handleChange,
        disabledButton,
        nextStep,
        deadline,
        showResend,
        onFinish,
        phone,
        resend
    }
}
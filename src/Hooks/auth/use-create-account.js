import * as Yup from 'yup'
import {useFormik} from 'formik'
import debounce from 'lodash.debounce'
import account from '../../Service/account'
import {useTranslation} from 'react-i18next'
import {slugify} from '../../utils/stringUtils'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {useCallback, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

const errors_by_field = {
    phone: '',
    username: '',
    password: ''
}

const values = {
    name: '',
    phone: '',
    lastname: '',
    username: '',
    password: '',
    checkbox: false,
    confirmPassword: ''
}

export function useCreateAccount() {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {state} = useLocation()
    const [initialValues, setInitialValues] = useState(values)
    const [usernameStatus, setUsernameStatus] = useState(-1)
    const [fetchedErrors, setFetchedError] = useState(errors_by_field)
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('required_field')),
        lastname: Yup.string()
            .required(t('required_field')),
        username: Yup.string()
            .required(t('required_field'))
            .test('usernameValidation', t(fetchedErrors.username), () => fetchedErrors.username.length === 0),
        phone: Yup.string()
            .required(t('required_field'))
            .test('phoneError', t(fetchedErrors.phone), () => fetchedErrors['phone'].length === 0),
        password: Yup.string()
            .min(8, t('at_least_eight_symbols'))
            .required(t('required_field'))
            .test('passwordError', t(fetchedErrors.password), () => fetchedErrors['password'].length === 0),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('password_mismatch'))
            .required(t('required_field'))
    })
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const {checkbox, confirmPassword, ...data} = values
    
            push({
                pathname: '/sign-up',
                search: `${URL_KEYS.STEP}=${URL_VALUES.PHONE_VERIFY}`,
                state: formik.values
            })
    
            account.createAccount({...data, phone: `+${data.phone}`})
                .then(() => {
                    push({
                        pathname: '/sign-up',
                        search: `${URL_KEYS.STEP}=${URL_VALUES.PHONE_VERIFY}`,
                        state: formik.values
                    })
                })
                .catch((error) => {
                    const errorData = error.response.data.errors || []
                    const touched = {}
                    const data = {}
                    if (errorData) {
                        for (let i = 0; i < errorData.length; i++) {
                            touched[errorData[i].field] = true
                            data[errorData[i].field] = errorData[i].message.replace(/[[\]']+/g, '')
                    
                        }
                        formik.setTouched({...touched})
                        formik.setErrors({...data})
                        setFetchedError({...errors_by_field, ...data})
                    }
                })
                .finally(() => setSubmitting(false))
        }
    })
    
    const validateUsername = (data) => {
        const value = data.toLowerCase()
        formik.setFieldValue('username', slugify(value.toLowerCase()))
        const touched = formik.touched
        const errors = formik.errors
        if (value.trim().length > 2) {
            account.validateUsername({username: slugify(value.toLowerCase())})
                .then(res => {
                    if (res.data.status) {
                        setUsernameStatus(1)
                        setFetchedError(errors_by_field)
                        delete touched['username']
                        delete errors['username']
                        formik.setErrors(errors)
                        formik.setTouched(touched)
                    } else {
                        formik.setTouched({...touched, username: true})
                        formik.setErrors({...errors, username: res.data.error.message})
                        setUsernameStatus(0)
                        setFetchedError({...errors_by_field, username: res.data.error.message})
                    }
                })
        } else {
            setUsernameStatus(-1)
        }
    }
    
    const disabledButton = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.values.name.trim().length === 0)
            || (formik.values.lastname.trim().length === 0)
            || (formik.values.username.trim().length === 0)
            || (formik.touched.username && !!formik.errors.username)
            || (formik.values.phone.trim().length === 0)
            || (formik.values.password.trim().length === 0)
            || (formik.values.confirmPassword.trim().length === 0)
            || (formik.touched.confirmPassword && !!formik.errors.confirmPassword)
            || (!formik.values.checkbox)
            || (fetchedErrors['phone'].length > 0)
        )
    }, [formik, fetchedErrors])
    
    const handleUsernameChange = debounce(validateUsername, 50)
    
    const handleChange = (key, value) => {
        setFetchedError(errors_by_field)
        formik.setFieldValue(key, value)
    }
    
    useEffect(() => {
        if (state) {
            setInitialValues(state)
        }
    }, [state])
    
    return {formik, handleChange, usernameStatus, disabledButton, handleUsernameChange}
}
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import {useFormik} from 'formik'
import {useCallback} from 'react'
import auth from '../../Service/auth'
import {useHistory} from 'react-router-dom'
import {tokenMount} from '../../Models/app'
import {useTranslation} from 'react-i18next'
import {getCurrentAccount} from '../../Models/account-model'

export function useSignIn() {
    const {t} = useTranslation()
    const {push} = useHistory()
    const validationSchema = Yup.object().shape({
        username: Yup.string().required(t('required_field')),
        password: Yup.string().required(t('required_field'))
    })
    
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit({username, password}, {setSubmitting}) {
            setSubmitting(true)
            let timeout = null
            auth.getToken({password, username})
                .then((res) => {
                    let users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : {}
                    users[username] = res.data
                    Cookies.set('users', JSON.stringify(users))
                    Cookies.set('token', res.data.access)
                    Cookies.set('refresh-token', res.data.refresh)
                    tokenMount(res.data.access)
                    getCurrentAccount()
                    timeout = setTimeout(() => {
                        push('/')
                    }, 100)
                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
            clearTimeout(timeout)
            timeout = null
        }
    })
    
    const disabled = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.password && !!formik.errors.password)
            || (formik.touched.name && !!formik.errors.name)
        )
        
    }, [formik])
    
    return {formik, disabled}
}
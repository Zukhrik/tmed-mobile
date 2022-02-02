import * as Yup from 'yup'
import moment from 'moment'
import {useFormik} from 'formik'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {useCallback, useState} from 'react'
import payment from '../../Service/payment'
import {useTranslation} from 'react-i18next'
import {accountCardMount} from '../../Models/payment-model'

const defaultValue = {
    name: '',
    number: '',
    expire_date: null
}

const defaultCodeValue = {
    activate_code: ''
}

export function useCreateAccountCard({onClose, setPayment, payment: paymentState}) {
    const {t} = useTranslation()
    const [showResend, setShowResend] = useState(false)
    const [deadline, setDeadline] = useState(Date.now() + 1000 * 60)
    const {$app: {cardId: creditCardId}} = useStore($appModel)
    const [cardId, setCardId] = useState(null)
    
    const getCard = useCallback((number) => {
        let tmp = ''
        for (let i = 0; i < number.length; i++) {
            if (i % 4 === 0) {
                tmp += ' ' + number[i]
            } else {
                tmp += number[i]
            }
        }
        return tmp
    }, [])
    
    const validationSchema = Yup.object().shape({
        number: Yup.string()
            .required(t('required_field'))
            .test('regexTest', t('required_field'), (value) => {
                return value && value.match(/^(\d\s*){16}$/)
            }),
        expire_date: Yup.mixed()
            .required(t('required_field'))
            .test('regexTest', t('required_field'), (value) => {
                return value && moment(value)
                    .format('MM/YY')
                    .replace(/\//g, '')
                    .match(/^(\d\s*){4}$/)
            })
    })
    
    const codeValidationSchema = Yup.object().shape({
        activate_code: Yup.string()
            .required(t('required_field'))
            .test('regexTest', t('required_field'), (value) => {
                return value && value.match(/^(\d\s*){6}$/)
            })
    })
    
    const formik = useFormik({
        validationSchema,
        initialValues: {
            ...defaultValue
        },
        
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const {number, expire_date, name} = values
            const data = {
                name: name,
                card_number: number.replace(/\s/g, ''),
                expire: expire_date.add(moment, 'MM/YY').format('MM/YY')
            }
            payment.crateAccountCard(data)
                .then((res) => {
                    if (res) {
                        setCardId(res.data.id)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })
    
    const codeFormik = useFormik({
        validationSchema: codeValidationSchema,
        initialValues: {
            ...defaultCodeValue
        },
        
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const {activate_code} = values
            if (activate_code.replace(/\s/g, '').length > 0) {
                
                const params = {
                    id: cardId ? cardId : creditCardId,
                    data: {
                        code: activate_code.replace(/\s/g, '')
                    }
                }
                
                console.log(activate_code)
                payment.verifyAccountCard(params)
                    .then(res => {
                        if (res) {
                            onClose()
                            accountCardMount()
                            if (paymentState) {
                                setPayment({
                                    id: res.data.id,
                                    title: `${getCard(res.data.card_number)} ${res.data.name}`,
                                    extraId: 3
                                })
                            }
                            setCardId(null)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }
        }
    })
    
    const disabledButtonCode = useCallback(() => {
        return (
            codeFormik.isSubmitting
            || (codeFormik.touched.activate_code && !!codeFormik.errors.activate_code)
        )
    }, [codeFormik])
    
    
    const disabledButton = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.number && !!formik.errors.number)
            || (formik.touched.expire_date && !!formik.errors.expire_date)
        )
    }, [formik])
    
    const handleChangeCode = (key, value) => {
        codeFormik.setFieldValue(key, value)
    }
    
    const handleChange = (key, value) => {
        formik.setFieldValue(key, value)
    }
    
    const resendCode = useCallback(() => {
        payment.resendPayMeCode({id: cardId ? cardId : creditCardId})
            .then((res) => {
                if (res) {
                    setDeadline(Date.now() + 1000 * 60)
                    setShowResend(false)
                }
            })
    }, [cardId, creditCardId])
    
    return {
        formik,
        cardId,
        deadline,
        setCardId,
        showResend,
        codeFormik,
        resendCode,
        handleChange,
        setShowResend,
        disabledButton,
        handleChangeCode,
        disabledButtonCode
    }
}
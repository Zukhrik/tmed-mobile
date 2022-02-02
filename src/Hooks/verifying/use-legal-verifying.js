import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$accountModel, accountAvatarsMount, accountInfoMount, accountPDataMount} from '../../Models/account-model'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import account from '../../Service/account'
import {useHistory} from 'react-router-dom'

const defaultValues = {
    business_ava: undefined,
    passport_series: '',
    passport_number: '',
    passport_scan: undefined
}

export function useLegalVerifying() {
    const {$accountPData: {data: pData}, $accountAvatars: {data: avatarsList}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [mounted, setMounted] = useState()
    const {t} = useTranslation()
    const {push} = useHistory()

    const validationSchema = Yup.object().shape({
        // business_ava: Yup.mixed().required(t('required_field')),
        passport_series: Yup.string().test('passport_series_validation', t('required_field'), (value) => {
            const newValue = value && value.replace(/_/g, '')
            return newValue && newValue.trim().length > 0
        }),
        passport_number: Yup.string().required(t('required_field')),
        passport_scan: Yup.mixed().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            const formData = new FormData()
            formData.append('passport_series', values.passport_series)
            formData.append('passport_number', values.passport_number)
            formData.append('passport_scan', values.passport_scan.file)

            account.updatePData(formData)
                .then((res) => {
                    if (res) {
                        const actions = (err = false) => {
                            if (!err) {
                                push({
                                    pathname: '/menu',
                                })
                            }
                        }
                        accountInfoMount({actions})
                    }
                })
                .finally(() => setSubmitting(false))
        }
    })

    const disabled = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.business_ava && !!formik.errors.business_ava)
            || (formik.touched.passport_scan && !!formik.errors.passport_scan)
            || (formik.touched.passport_series && !!formik.errors.passport_series)
            || (formik.touched.passport_number && !!formik.errors.passport_number)
        )
    }, [formik])

    const createBusinessAva = useCallback((formData, data) => {
        setUploadLoading(true)
        account.createAvatar(formData)
            .then((res) => {
                if (res) {
                    formik.setFieldValue('business_ava', data)
                    setUploadLoading(false)
                }
            })
            .catch((e) => {
                console.log(e)
                setUploadLoading(false)
            })
    }, [formik])

    const updateBusinessAva = useCallback((formData, data) => {
        setUploadLoading(true)
        account.updateAvatar(formData)
            .then(res => {
                if (res) {
                    formik.setFieldValue('business_ava', data)
                    setUploadLoading(false)
                }
            })
            .catch((e) => {
                console.log(e)
                setUploadLoading(false)
            })
    }, [formik])

    const uploadBusinessAvatar = useCallback((data) => {
        const business_ava_item = avatarsList && avatarsList.length > 0
            ? avatarsList.find(item => item.business_ava) || {}
            : {}
        const formData = new FormData()
        formData.append('main', '0')
        formData.append('business_ava', '1')
        formData.append('image', data.file)

        if (business_ava_item && business_ava_item.id) {
            updateBusinessAva({id: business_ava_item.id, data: formData}, data)
        } else {
            createBusinessAva(formData, data)
        }
    }, [updateBusinessAva, createBusinessAva, avatarsList])

    useEffect(() => {
        // const business_ava_item = avatarsList && avatarsList.length > 0 && avatarsList.find(item => item.business_ava)
        if (pData && !mounted) {
            setInitialValues({
                ...defaultValues,
                passport_series: pData.passport_series || '',
                passport_number: pData.passport_number || '',
                passport_scan: pData.passport_scan ? {imgUrl: pData.passport_scan, file: null} : undefined
            })

            setMounted(true)
        }
    }, [avatarsList, pData, mounted])

    useEffect(() => {
        accountPDataMount()
        accountAvatarsMount({limit: 10, offset: 0})
    }, [])

    return {formik, disabled, uploadBusinessAvatar, uploadLoading}
}
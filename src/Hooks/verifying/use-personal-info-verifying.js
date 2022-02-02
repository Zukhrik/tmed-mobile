import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import * as Yup from 'yup'
import {useStore} from "effector-react";
import {$accountModel, updateAccountMount} from "../../Models/account-model";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {URL_KEYS} from "../../Constants";

const defaultValues = {
    login: '',
    name: '',
    lastname: '',
    surname: '',
    gender: '',
    birthday: moment(new Date()).format('YYYY-MM-DD'),
    category: undefined,
    region: undefined
}

export function usePersonalInfoVerifying() {
    const {$accountInfo: {data}, $profiles:{currentProfile}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [mounted, setMounted] = useState()
    const {t} = useTranslation()
    const {push} = useHistory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field')),
        lastname: Yup.string().required(t('required_field')),
        surname: Yup.string().required(t('required_field')),
        gender: Yup.string().required(t('required_field')),
        birthday: Yup.string().required(t('required_field')),
        category: Yup.mixed().required(t('required_field')),
        region: Yup.mixed().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting, resetForm}) {
            setSubmitting(true)
            const actions = (err = false) => {
                setSubmitting(false)
                if(!err) {
                    push({
                        pathname: '/settings',
                        search: `${URL_KEYS.VERIFICATION_STEP}=2`
                    })
                }
            }
            const data = {
                name: values.name,
                lastname: values.lastname,
                surname: values.surname,
                gender: values.gender,
                birthday: values.birthday,
                main_cat_id: values.category.id,
                region_id: values.region.id
            }
            updateAccountMount({data, actions})
        }
    })

    useEffect(() => {
        if (data && Object.values(data).length > 0 && currentProfile && !mounted) {
            setInitialValues({
                login: `@${currentProfile.slug_name}`,
                name: data.name,
                lastname: data.lastname || '',
                surname: data.surname || '',
                gender: data.gender || '',
                birthday: data.birthday || moment(new Date()).format('YYYY-MM-DD'),
                category: data.main_cat || undefined,
                region: data.region || undefined
            })
            setMounted(true)
        }
    }, [currentProfile, data, mounted])

    const disabled = useCallback(() => {
        return formik.isSubmitting ||
            (formik.touched.name && !!formik.errors.name) ||
            (formik.touched.lastname && !!formik.errors.lastname) ||
            (formik.touched.surname && !!formik.errors.surname) ||
            (formik.touched.birthday && !!formik.errors.birthday) ||
            (formik.touched.gender && !!formik.errors.gender) ||
            (formik.touched.category && !!formik.errors.category) ||
            (formik.touched.region && !!formik.errors.region)
    }, [formik])

    return {formik, disabled}
}
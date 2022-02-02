import {useFormik} from "formik";
import {useEffect, useState} from "react";
import {$accountModel, accountInfoMount, accountVideoVerifyMount} from "../../Models/account-model";
import {useStore} from "effector-react";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import account from "../../Service/account";

export function useVideoVerifying() {
    const {$accountVideoVerify: {data}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState({
        video: undefined
    })
    const {t} = useTranslation()
    const {push} = useHistory()

    const validationSchema = Yup.object().shape({
        video: Yup.mixed().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit({video}, {setSubmitting}) {
            setSubmitting(true)
            const actions = (error = false) => {
                if (!error) {
                    push({
                        pathname: '/settings'
                    })
                }
                setSubmitting(false)
            }
            const formData = new FormData()
            formData.append('file', video.file)
            account.createVideoVerify(formData)
                .then((res) => {
                    if (res) {
                        accountInfoMount({actions})
                    }else {
                        actions(true)
                    }
                })
                .catch(e => {
                    setSubmitting(false)
                })

        }
    })

    useEffect(() => {
        if (data.length > 0) {
            setInitialValues({
                video: data[0].file ? {videoUrl: data[0].file, file: null} : undefined
            })
        }
    }, [data])

    useEffect(() => {
        accountVideoVerifyMount()
    }, [])

    // console.log(formik.values)

    return {formik}
}
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useStore} from 'effector-react'
import {useEffect, useState} from 'react'
import account from '../../Service/account'
import {useTranslation} from 'react-i18next'
import {$accountModel, accountAvatarsMount} from '../../Models/account-model'

const defaultValue = {
    business_ava: undefined,
    user_lang: '',
    category: null,
    region: null,
    currency: '',
    birthday: '',
    gender: '',
    phone: '',
    email: ''
}

export function useProfileInfo() {
    const [initialValues, setInitialValues] = useState(defaultValue)
    const {$accountInfo, $accountAvatars} = useStore($accountModel)
    const [mounted, setMounted] = useState(false)
    const validationSchema = Yup.object().shape({})
    const {i18n} = useTranslation()
    
    const formik = useFormik({
        validationSchema,
        initialValues,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const {category, region, user_lang, gender} = values
            const changeLanguage = (language) => {
                i18n.changeLanguage(language).then()
            }
            
            const data = {
                main_cat_id: category.id,
                region_id: region.id,
                lang: user_lang,
                gender: gender
            }
            
            
            if (values.user_lang === 'uz') {
                changeLanguage('uz')
            } else if (values.user_lang === 'ru') {
                changeLanguage('ru')
            }
            
            account.updateAccount({data})
                .then(res => {
                    if (res) {
                        // console.log(res.data)
                    }
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
                    }
                })
                .finally()
        }
    })
    
    const getData = (value) => {
        return value || ''
    }
    
    useEffect(() => {
        const accountData = $accountInfo?.data
        const avatarsData = $accountAvatars?.data
        
        if (!!accountData && !!avatarsData && !mounted) {
            const business_ava = avatarsData.length > 0 && avatarsData.find(item => item.business_ava)
            
            setInitialValues({
                ...defaultValue,
                region: getData(accountData.region),
                category: getData(accountData.main_cat),
                business_ava: business_ava ? {stringUrl: getData(business_ava.image), file: null} : false,
                currency: getData(accountData?.currency?.code),
                user_lang: getData(accountData.user_lang),
                birthday: getData(accountData.birthday),
                phone: getData(accountData.phone),
                gender: getData(accountData.gender),
                email: getData(accountData.email)
            })
            
            setMounted(true)
        }
        
    }, [$accountInfo.data, $accountAvatars.data, mounted])
    
    useEffect(() => {
        accountAvatarsMount()
    }, [])
    
    return {
        formik
    }
}
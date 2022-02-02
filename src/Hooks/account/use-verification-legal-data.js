import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useStore} from 'effector-react'
import {useEffect, useState} from 'react'
import {$accountModel, accountAvatarsMount} from '../../Models/account-model'

const defaultValue = {
    business_ava: undefined,
    passport_series: '',
    passport_number: '',
    passport_scan: ''
}

export function useVerificationLegalData() {
    const validationSchema = Yup.object().shape()
    const [mounted, setMounted] = useState(false)
    const [initialValues, setInitialValues] = useState(defaultValue)
    const {$accountAvatars, $accountPDataMount} = useStore($accountModel)
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true
    })
    
    const getData = (value) => {
        return value || ''
    }
    
    useEffect(() => {
        const avatarsData = $accountAvatars.data
        const accountPDataMount = $accountPDataMount.data
        
        if (!!$accountPDataMount && !!avatarsData && !mounted) {
            const business_ava = avatarsData.length > 0 && avatarsData.find(item => item.business_ava)
            
            setInitialValues({
                ...defaultValue,
                business_ava: business_ava ? {stringUrl: business_ava.image, file: null} : false,
                passport_number: getData(accountPDataMount && accountPDataMount.passport_number),
                passport_series: getData(accountPDataMount && accountPDataMount.passport_series)
            })
            setMounted(true)
        }
    }, [$accountAvatars, $accountPDataMount, mounted])
    
    useEffect(() => {
        accountAvatarsMount()
    }, [])
    
    return {
        formik
    }
}
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $accountModel } from '../../Models/account-model';

const defaultValue = {
  name: '',
  gender: '',
  region: '',
  surname: '',
  lastname: '',
  birthday: '',
  category: '',
}

export function useVerificationPersonalData() {
  const [initialValues, setInitialsValues] = useState(defaultValue)
  const [mounted, setMounted] = useState(false)
  const validationSchema = Yup.object().shape({})
  const { $accountInfo } = useStore($accountModel)

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
  })

  const getData = (value) => {
    return value || ''
  }

  useEffect(() => {
    const accountData = $accountInfo.data

    if (!!accountData && !mounted) {

      setInitialsValues({
        ...defaultValue,
        name: getData(accountData.name),
        gender: getData(accountData.gender),
        surname: getData(accountData.surname),
        lastname: getData(accountData.lastname),
        birthday: getData(accountData.birthday),
        region: getData(accountData.region) ? getData(accountData.region) : undefined,
        category: getData(accountData.main_cat) ? getData(accountData.main_cat) : undefined,
      })
      setMounted(true)
    }
  }, [$accountInfo.data, mounted])

  return {
    formik
  }
}
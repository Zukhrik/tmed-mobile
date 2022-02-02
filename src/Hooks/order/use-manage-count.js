import {useCallback, useState} from 'react'
import {useUrlParams} from '../app'
import order from '../../Service/order'
import {URL_KEYS} from '../../Constants'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {getMeasurement} from '../../utils/get-measurement'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {showMessage} from '../../UIComponents/MessageNotification'


export function useManageCount() {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const [values, setValues] = useState({})
    
    const initialParams = {
        limit: 10,
        offset: 0
    }
    
    
    const handleDecrement = useCallback((item) => {
        if (item.qty !== item.offering.min_qty) {
            const params = {
                offering_id: item.offering.id,
                data: {
                    qty: item.qty - item.offering.min_qty
                }
            }
            
            order.updateOrgOrderCart(params)
                .then(res => {
                    if (res) {
                        const data = {
                            clear: true,
                            org_slug_name: organization,
                            params: {
                                ...initialParams,
                                responsible: specId
                            }
                        }
                        getOrgOrderCartsMount(data)
                    }
                })
        }
    }, [initialParams, organization, specId])
    
    const handleIncrement = useCallback((item) => {
        if (item.offering.qty > item.qty || !item.offering.qty) {
            const params = {
                offering_id: item.offering.id,
                data: {
                    qty: item.qty + item.offering.min_qty
                }
            }
            order.updateOrgOrderCart(params)
                .then(res => {
                    if (res) {
                        const data = {
                            clear: true,
                            org_slug_name: organization,
                            params: {
                                ...initialParams,
                                responsible: specId
                            }
                        }
                        getOrgOrderCartsMount(data)
                    }
                })
        }
    }, [organization, initialParams, specId])
    
    const handleChange = useCallback((value, {offering}) => {
        setValues({...values, [offering.id]: value.replace(/\D/g, '')})
    }, [values])
    
    const handleBlur = useCallback((offering, qty) => {
        const value = values[offering.id] !== undefined && values[offering.id] !== '' && Number(values[offering.id])
        
        if (value) {
            if (offering.qty && value > offering.qty) {
                showMessage(
                    t('in_stock_var', {q: offering.qty, m: t(getMeasurement(offering.measurement, 'label'))}),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: qty})
                return false
            } else if (offering.max_qty && value > offering.max_qty) {
                showMessage(
                    t('max_count_purchases_var', {
                        q: offering.max_qty,
                        m: t(getMeasurement(offering.measurement, 'label'))
                    }),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: offering.max_qty})
                return false
            } else if (value > offering.min_qty && offering.max_qty) {
                showMessage(
                    t('min_count_purchases_var', {
                        q: offering.min_qty,
                        m: t(getMeasurement(offering.measurement, 'label'))
                    }),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: offering.min_qty})
                
                return false
            }
        } else {
            showMessage(
                t('min_count_purchases_var', {
                    q: offering.min_qty,
                    m: t(getMeasurement(offering.measurement, 'label'))
                }),
                'danger',
                false
            )
            setValues({...values, [offering.id]: offering.min_qty})
            return false
        }
        
    }, [values, t])
    
    return {handleIncrement, handleDecrement, handleChange, handleBlur, values, setValues}
}
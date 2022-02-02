import {useEffect} from 'react'
import {useUrlParams} from '../app'
import {getOrgOrderResponsibleMount} from '../../Models/order-model'

export function useOrgOrderResponsible() {
    const {urlData} = useUrlParams()
    const specId = urlData.specialist_id
    
    useEffect(() => {
        if (specId) {
            getOrgOrderResponsibleMount({responsible_id: specId})
        }
    }, [specId])
}
import {useParams} from 'react-router-dom'
import {orgPaymentMethodsMount} from '../../Models/org-model'
import {useEffect} from 'react'

export function useOrgPayments() {
    const {organization} = useParams()
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            const params = {
                org_slug_name: organization
            }
            orgPaymentMethodsMount(params)
        }, 2000)
        
        return () => {
            setTimeout(timeout)
            timeout = null
        }
    }, [organization])
}
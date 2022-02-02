import {useEffect} from 'react'
import {accountCouponsMount} from '../../Models/account-model'

export function useAccountCoupons() {
    
    useEffect(() => {
        accountCouponsMount()
    }, [])
}
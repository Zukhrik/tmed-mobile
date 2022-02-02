import {useEffect} from 'react'
import {accountCardMount} from '../../Models/payment-model'

export function useAccountCard() {
    useEffect(() => {
        accountCardMount()
    }, [])
}
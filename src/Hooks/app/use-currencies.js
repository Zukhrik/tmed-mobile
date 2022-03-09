import {useEffect} from 'react'
import {currenciesMount} from '../../Models/app'


export function useCurrencies() {
    
    useEffect(() => {
        currenciesMount()
    }, [])
}
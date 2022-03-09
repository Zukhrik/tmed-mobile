import {useEffect} from 'react'
import {detectLocationMount} from '../../Models/app'

export function useDetectLocation() {
    
    useEffect(() => {
        detectLocationMount()
    }, [])
}
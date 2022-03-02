import {useEffect} from 'react'

export function useBodyOverflowHidden(value) {
    useEffect(() => {
        if (value) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [value])
}
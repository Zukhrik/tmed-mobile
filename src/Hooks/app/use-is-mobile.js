import {useCallback, useEffect} from 'react'
import {deviceMount} from '../../Models/app'
import {DESKTOP, INFO_MAT, MOBILE, TABLET} from '../../Constants/app'

export function useIsMobile() {
    
    const getDevice = useCallback(() => {
        let device = null
        const width = window.innerWidth
        if (width > 1200) {
            device = DESKTOP
        }else if(width > 1050 && width < 1090){
            device = INFO_MAT
        } else if (width < 1200 && width > 768) {
            device = TABLET
        } else if (width < 768) {
            device = MOBILE
        }
        deviceMount(device)
    }, [])
    
    useEffect(() => {
        getDevice()
        window.addEventListener('resize', getDevice)
        
        return () => {
            window.removeEventListener('resize', getDevice)
        }
    }, [getDevice])
}
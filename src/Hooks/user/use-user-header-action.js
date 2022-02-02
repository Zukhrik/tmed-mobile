import {useHistory, useLocation} from 'react-router-dom'
import {saveURLMount} from '../../Models/app'

export function useUserHeaderAction(setOpenModal, openModal) {
    const {push} = useHistory()
    const {pathname} = useLocation()
    
    const onLogoClick = () => {
        push('/')
    }
    
    const onCartClick = () => {
        push('/records/unregistered')
        saveURLMount(pathname)
    }
    
    const onMenuClick = () => {
        setOpenModal(true)
    }
    
    return {onLogoClick, onCartClick, onMenuClick}
}
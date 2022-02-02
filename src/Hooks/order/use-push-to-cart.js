import {useEffect} from 'react'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../Constants'
import {useHistory, useParams} from 'react-router-dom'
import {changeSpecPanel, saveURLMount} from '../../Models/app'
import {$orderModel, resetOrderCartList, resetOrgOrderCart} from '../../Models/order-model'


export function usePushToCart() {
    const {organization} = useParams()
    const {push, location: {pathname}} = useHistory()
    const {$orgOrderCartList: {data, result}} = useStore($orderModel)
    
    useEffect(() => {
        if (pathname === `/${organization}/offerings`) {
            saveURLMount('')
        }
    }, [organization, pathname])
    
    const handlePush = () => {
        if (result[organization]?.count > 0) {
            resetOrgOrderCart()
            resetOrderCartList()
            changeSpecPanel(false)
            saveURLMount(pathname)
            const specId = data[organization][0]?.responsible?.id
            push({
                pathname: `/records/unregistered/${organization}`,
                search: `?${URL_KEYS.SPECIALIST_ID}:${specId}`
            })
        } else {
            resetOrgOrderCart()
            resetOrderCartList()
            changeSpecPanel(false)
            saveURLMount(pathname)
            push('/records/unregistered')
        }
    }
    
    return {handlePush, result}
}
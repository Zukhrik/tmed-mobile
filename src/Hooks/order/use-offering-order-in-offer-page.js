import {useState} from 'react'
import {useUrlParams} from '../app'
import order from '../../Service/order'
import {URL_KEYS} from '../../Constants'
import {saveURLMount} from '../../Models/app'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {useOfferingDetail} from '../offerings'

export function useOfferingOrderInOfferPage() {
    const {push} = useHistory()
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()
    const {organization, offering_id} = useParams()
    const [buttonLoad, setButtonLoad] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const {res} = useOfferingDetail(offering_id)
    
    
    const handleRequest = () => {
        saveURLMount(pathname)
        const specId = urlData[URL_KEYS.SPECIALIST_ID] ? urlData[URL_KEYS.SPECIALIST_ID] : res?.data?.responsible[0]?.id
        
        if (res?.data?.is_in_cart) {
            push(`/records/unregistered/${organization}?${URL_KEYS.SPECIALIST_ID}=${specId}`)
        } else {
            const params = {
                org_slug_name: organization,
                data: {
                    offering_id,
                    responsible_id: specId
                }
            }
            setButtonLoad(true)
            order.postOrgOrderCart(params)
                .then(response => {
                    getOrgOrderCartsMount()
                    if (response) {
                        push(`/records/unregistered/${organization}?${URL_KEYS.SPECIALIST_ID}=${urlData[URL_KEYS.SPECIALIST_ID]}`)
                        setButtonLoad(false)
                    }
                })
        }
        
        // const params = {
        //     org_slug_name: organization,
        //     data: {
        //         offering_id,
        //         responsible_id: specId
        //     }
        // }
        // setButtonLoad(true)
        // order.postOrgOrderCart(params)
        //     .then(response => {
        //         getOrgOrderCartsMount()
        //         if (response) {
        //             push(`/records/unregistered/${organization}?${URL_KEYS.SPECIALIST_ID}=${urlData[URL_KEYS.SPECIALIST_ID]}`)
        //             setButtonLoad(false)
        //         }
        //     })
    }
    
    return {handleRequest, openModal, setOpenModal, buttonLoad}
}
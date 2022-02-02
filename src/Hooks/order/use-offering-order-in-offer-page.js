import {useState} from 'react'
import {useUrlParams} from '../app'
import {useStore} from 'effector-react'
import order from '../../Service/order'
import {URL_KEYS} from '../../Constants'
import {saveURLMount} from '../../Models/app'
import {$offeringsModel} from '../../Models/offerings-model'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {useHistory, useLocation, useParams} from 'react-router-dom'

export function useOfferingOrderInOfferPage() {
    const {push} = useHistory()
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()
    const {organization} = useParams()
    const {$offeringInfo: {data}} = useStore($offeringsModel)
    const [openModal, setOpenModal] = useState(false)
    
    
    const handleRequest = () => {
        saveURLMount(pathname)
        const offeringId = data.id
        const specId = urlData[URL_KEYS.SPECIALIST_ID] ? urlData[URL_KEYS.SPECIALIST_ID] : data?.responsible[0]?.id
        const params = {
            org_slug_name: organization,
            data: {
                offering_id: offeringId,
                responsible_id: specId
            }
        }
        order.postOrgOrderCart(params)
            .then(response => {
                getOrgOrderCartsMount()
                if (response) {
                    push(`/records/unregistered/${organization}?${URL_KEYS.SPECIALIST_ID}=${urlData[URL_KEYS.SPECIALIST_ID]}`)
                }
            })
    }
    
    return {handleRequest, openModal, setOpenModal}
}
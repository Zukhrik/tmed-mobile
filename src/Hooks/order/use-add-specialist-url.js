import {useEffect} from 'react'
import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useStore} from 'effector-react'
import {$orderModel} from '../../Models/order-model'
import {useHistory, useParams} from 'react-router-dom'

export function useAddSpecialistUrl() {
    const {push} = useHistory()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {$orderCartList: {data}} = useStore($orderModel)
    const currentOrg = data.find(item => item.seller.slug_name === organization)
    const otherOrgs = data.filter(item => item.seller.slug_name !== organization)
    const specList = currentOrg ? currentOrg.seller.specialists : []
    const currentSpecInfo = specList.find(item => item.id.toString() === urlData.specialist_id)
    
    useEffect(() => {
        if (data?.length > 0){
            if (!specId && specList.length > 0) {
                push({
                    pathname: `/records/unregistered/${organization}`,
                    search: `${URL_KEYS.SPECIALIST_ID}=${specList[0].id}`
                })
            } else if (organization !== currentOrg?.seller?.slug_name ){
                push(`/${organization}/offerings`)
            }
            
            // else if(!specId) push(`/${organization}/offerings`)
        }
    }, [specList, specId, organization, currentOrg, push, data])
    
    return {currentOrg, organization, specId, specList, otherOrgs, currentSpecInfo, push}
}
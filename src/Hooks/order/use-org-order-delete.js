import {useEffect} from 'react'
import {useUrlParams} from '../app'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../Constants'
import order from '../../Service/order'
import {$appModel} from '../../Models/app'
import {useHistory, useParams} from 'react-router-dom'
import {$orderModel, getOrderCartListMount, getOrgOrderCartsMount} from '../../Models/order-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOrgOrderDelete() {
    const {push} = useHistory()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {$app: {saveURL}} = useStore($appModel)
    const {$orgOrderCartList: {data}} = useStore($orderModel)
    const {$orderCartList: {data: orderCartsData}} = useStore($orderModel)
    const specList = orderCartsData.find(item => item.seller.slug_name === organization)?.seller?.specialists
    
    useEffect(() => {
        if (data[organization] && data[organization].length <= 0) {
            if (specList && specList.length > 0) {
                push({
                    pathname: `/records/unregistered/${organization}`,
                    search: `${URL_KEYS.SPECIALIST_ID}=${specList[0].id}`
                })
            }
        }
        
    }, [data, organization, push, specList])
    
    const handleDelete = (id) => {
        const pushToOrg = () => {
            push(saveURL ? saveURL : `/${organization}/offerings`)
        }
        
        if (data && data[organization]) {
            const params = {
                offering_id: id,
                organization,
                action: () => {
                    const params = {
                        action: () => pushToOrg(),
                        isRedirect: true,
                        organization
                    }
                    getOrderCartListMount(params)
                }
            }
            order.deleteOrderCart(params)
                .then(res => {
                    if (res) {
                        const data = {
                            clear: true,
                            org_slug_name: organization,
                            params: {
                                ...initialParams,
                                responsible: specId
                            },
                            action: () => {
                                const params = {
                                    action: () => pushToOrg(),
                                    isRedirect: true,
                                    organization
                                }
                                getOrderCartListMount(params)
                            }
                        }
                        
                        getOrgOrderCartsMount(data)
                    }
                })
            
            // deleteOrderCartMount(params)
        }
    }
    
    return {organization, handleDelete}
}
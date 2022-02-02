import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$orderModel, getOrgOrderCartsMount, resetOrgOrderCart} from '../../Models/order-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOrgOrderCarts() {
    const {organization} = useParams()
    const {urlData} = useUrlParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {$orgOrderCartList: {result}} = useStore($orderModel)
    
    const getList = useCallback((params) => {
        const data = {
            org_slug_name: organization,
            ...params
        }
        getOrgOrderCartsMount(data)
    }, [organization])
    
    const loadMore = useCallback(() => {
        if (result?.[organization]?.nextOffset) {
            const params = {
                ...initialParams,
                offset: result[organization].nextOffset
            }
            getList({params})
        }
    }, [getList, result, organization])
    
    useEffect(() => {
        const data = {
            clear: true,
            params: initialParams
        }
        
        resetOrgOrderCart()
        if (specId) {
            data.params['responsible'] = specId
            getList(data)
        }
    }, [getList, specId])
    
    return {loadMore, organization}
}
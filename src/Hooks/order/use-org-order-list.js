import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {$offeringsModel} from '../../Models/offerings-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOrgOrderList() {
    const {organization} = useParams()
    const {$app: {token}} = useStore($appModel)
    const {$offeringsList: {result}} = useStore($offeringsModel)
    
    const getList = useCallback((params) => {
        if (!!token) {
            getOrgOrderCartsMount({clear: true, org_slug_name: organization, params})
        }
    }, [organization, token])
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const params = {
                ...initialParams,
                offset: result.nextOffset
            }
            getList(params)
        }
    }, [getList, result])
    
    useEffect(() => {
        getList(initialParams)
    }, [getList])
    
    return {loadMore}
}
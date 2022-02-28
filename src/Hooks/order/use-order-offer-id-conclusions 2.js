import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$orderModel, orderOffersConclusionsMount} from '../../Models/order-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOrderOfferIdConclusions() {
    const {offer_id} = useParams()
    const {$orderOffersConclusions: {result}} = useStore($orderModel)
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            if (offer_id) {
                const params = {
                    order_offer_id: offer_id,
                    params: {
                        ...initialParams,
                        offset: result.nextOffset
                    }
                }
                orderOffersConclusionsMount(params)
            }
        }
    }, [result, offer_id])
    
    useEffect(() => {
        if (offer_id) {
            const params = {
                clear: true,
                order_offer_id: offer_id
            }
            orderOffersConclusionsMount(params)
        }
    }, [offer_id])
    
    return {loadMore}
}
import {useCallback} from 'react'
import {useListQuery, useUrlParams} from '../app'
import {useStore} from 'effector-react'
import order from '../../Service/order'
import {useParams} from 'react-router-dom'
import {$appModel} from '../../Models/app'
import {$accountModel} from '../../Models/account-model'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {useMutation} from 'react-query'
import {queryClient} from '../../App'
import cart from '../../Service-v2/cart'

export function useOrgOrder() {
    const {query} = useListQuery()
    const {organization} = useParams()
    const {$detectLocationInfo} = useStore($appModel)
    const {urlData: {specialist_id: specId}} = useUrlParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const currency = currentProfile ? currentProfile.currency.code : $detectLocationInfo.currency || ''
    
    const create = useMutation(cart.addToCart, {
        onMutate: itemInfo => {
            queryClient.cancelQueries(['/org/offerings', organization])
            
            const {pages} = queryClient.getQueryData(['/org/offerings', organization, query])
            
            queryClient.setQueryData(['/org/offerings', organization])
            
            return () => queryClient.setQueryData(['/org/offerings', organization], pages)
        },
        onSuccess: () => {
            getOrgOrderCartsMount({
                org_slug_name: organization,
                params: {limit: 1, offset: 0},
                clear: true
            })
        },
        onError: (err, itemId, rollback) => rollback(),
        onSettled: itemInfo => {
            queryClient.invalidateQueries(['/org/offerings', organization])
        }
    })
    
    const remove = useMutation(order.deleteOrderCart, {
        onMutate: itemInfo => {
            queryClient.cancelQueries(['/org/offerings', organization])
            
            const previousTodo = queryClient.getQueryData(['/org/offerings', organization, query])
            
            queryClient.setQueryData(['/org/offerings', organization])
            
            return () => queryClient.setQueryData(['/org/offerings', organization, query], previousTodo)
        },
        onSuccess: () => {
            getOrgOrderCartsMount({
                org_slug_name: organization,
                params: {limit: 1, offset: 0},
                clear: true
            })
        },
        onError: (err, newData, rollback) => rollback(),
        onSettled: itemInfo => {
            queryClient.invalidateQueries(['/org/offerings', organization, query])
                .then(res => {
                    if (res) {
                        getOrgOrderCartsMount({
                            org_slug_name: organization,
                            params: {limit: 1, offset: 0},
                            clear: true
                        })
                    }
                })
        }
    })
    
    const onCreatingCartItem = useCallback((event) => {
        const orgSpecList = event.responsible
        if (event.inCart) {
            remove.mutate({offering_id: event.id})
        } else {
            const data = [
                {
                    offering_id: event.id,
                    responsible_id: specId ? specId : orgSpecList[0].id,
                    qty: event.qty ? event.qty : 1
                }
            ]
            create.mutate(data)
        }
    }, [create, specId, remove])
    
    const getIsLoading = useCallback((id) => {
        if (create.isLoading && create?.variables?.data?.offering_id === id) {
            return true
        }
        
        if (remove.isLoading && remove?.variables?.offering_id === id) {
            return true
        }
        
        return false
    }, [create, remove])
    
    
    return {
        currency,
        create,
        remove,
        getIsLoading,
        onCreatingCartItem
    }
}
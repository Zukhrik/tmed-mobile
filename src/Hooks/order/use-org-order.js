import {useCallback} from 'react'
import {useUrlParams} from '../app'
import {useStore} from 'effector-react'
import order from '../../Service/order'
import {useLocation} from 'react-router-dom'
import {$appModel, saveURLMount} from '../../Models/app'
import {$accountModel} from '../../Models/account-model'
import {getOrgOrderCartsMount} from '../../Models/order-model'
import {changeLoadingStatusOffering, changeOrgOfferingStatus} from '../../Models/offerings-model'

export function useOrgOrder() {
    const {pathname} = useLocation()
    const {$detectLocationInfo} = useStore($appModel)
    const {urlData: {specialist_id: specId}} = useUrlParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const currency = currentProfile ? currentProfile.currency.code : $detectLocationInfo.currency || ''
    
    const checkoutOffering = useCallback((event) => {
        const orgSpecList = event.responsible
        
        if (!event.loading) {
            changeLoadingStatusOffering({id: event.id, status: true})
            if (!event.inCart) {
                const params = {
                    org_slug_name: event.organization,
                    data: {
                        offering_id: event.id,
                        responsible_id: specId ? specId : orgSpecList[0].id
                    }
                }
                order.postOrgOrderCart(params)
                    .then((res) => {
                        if (res) {
                            saveURLMount(pathname)
                            changeOrgOfferingStatus({
                                offering_id: params.data.offering_id,
                                status: true,
                                loadingStatus: false
                            })
                            getOrgOrderCartsMount({
                                org_slug_name: event.organization,
                                params: {limit: 1, offset: 0},
                                clear: true
                            })
                        }
                    })
                    .catch((e) => {
                        console.log(e.response)
                    })
            } else {
                order.deleteOrderCart({offering_id: event.id})
                    .then((res) => {
                        if (res) {
                            changeOrgOfferingStatus({offering_id: event.id, status: false, loadingStatus: false})
                            getOrgOrderCartsMount({
                                org_slug_name: event.organization,
                                params: {limit: 1, offset: 0},
                                clear: true
                            })
                        }
                    })
                    .catch((e) => {
                        console.log(e.response)
                    })
            }
        }
        
    }, [specId, pathname])
    
    return {
        currency, checkoutOffering
    }
}
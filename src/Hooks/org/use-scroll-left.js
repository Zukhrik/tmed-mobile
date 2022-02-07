import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$offeringsModel, orgOfferGroupListMount} from '../../Models/offerings-model'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useScrollLeft() {
    const {organization} = useParams()
    const {$offeringGroupList: {loading, result}} = useStore($offeringsModel)
    
    const handleScroll = useCallback((e) => {
        if (e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth && !loading && !!result.next) {
            const data = {
                organization: organization,
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            orgOfferGroupListMount(data)
        }
    }, [loading, result, organization])
    
    return {handleScroll}
}
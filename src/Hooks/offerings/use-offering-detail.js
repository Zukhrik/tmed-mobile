import {useQuery} from 'react-query'
import orgApi from '../../Service-v2/organization'

export function useOfferingDetail(offering_id) {
    const {data: res, isLoading} = useQuery(
        ['/offers/id', offering_id],
        () => orgApi.getOfferingId(offering_id),
        {
            enabled: !!offering_id
        }
    )
    
    return {res, isLoading}
}
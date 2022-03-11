import {useInfiniteQuery} from 'react-query'
import orgApi from '../../Service-v2/organization'
import {useListQuery} from '../app'
import {useMemo} from 'react'
import {useParams} from 'react-router-dom'

export function useQueryOfferingList() {
    const {query} = useListQuery()
    const {organization} = useParams()
    
    const orgOfferQuery = useInfiniteQuery(
        ['/org/offerings', organization, query],
        async ({pageParam = 0}) => {
            
            let params = {
                limit: 10,
                offset: pageParam
            }
            
            if (query) {
                params = {...params, ...query}
            }
            const res = await orgApi.getOrgOffering({slug: organization, params})
            return {...res.data, nextOffset: pageParam + 10}
        },
        {
            enabled: !!(organization && query),
            getNextPageParam: (data) => {
                if (data.count > data.nextOffset) {
                    return data?.nextOffset
                } else {
                    return undefined
                }
            }
        }
    )
    
    const list = useMemo(() => {
        const data = orgOfferQuery.data
        if (data?.pages && data?.pages.length > 0) {
            const arr = data?.pages
            let tmp = []
            for (let g of arr) {
                if (g?.result) {
                    tmp = [...tmp, ...g.result]
                }
            }
            return tmp
        }
        return []
    }, [orgOfferQuery.data])
    
    const dataLength = useMemo(() => {
        const data = orgOfferQuery.data
        return data?.pages ? data.pages[data.pages.length - 1]?.nextOffset || 10 : 10
    }, [orgOfferQuery.data])
    
    return {orgOfferQuery, dataLength, list}
}
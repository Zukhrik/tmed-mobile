import {useInfiniteQuery} from 'react-query'
import orgApi from '../../Service-v2/organization'
import {useListQuery} from '../app'
import {useMemo} from 'react'
import {useParams} from 'react-router-dom'

export function useQueryOfferingList() {
    const {query} = useListQuery()
    const {organization} = useParams()
    
    const {isLoading, hasNextPage, fetchNextPage, data} = useInfiniteQuery(
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
    }, [data])
    
    const dataLength = useMemo(() => {
        return data?.pages ? data.pages[data.pages.length - 1]?.nextOffset || 10 : 10
    }, [data])
    
    return {dataLength, list, isLoading, hasNextPage, fetchNextPage, }
}
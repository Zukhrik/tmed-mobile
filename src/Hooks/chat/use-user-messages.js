import {useCallback, useEffect, useState} from 'react'
import {$chatModel, userChatDetailMount} from '../../Models/chat-model'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 50,
    offset: 0
}

export function useUserMessages() {
    const {$userMessages: {loading, result}} = useStore($chatModel)
    const {partner_slug} = useParams()
    const [mounted, setMounted] = useState()
    const getList = useCallback((params) => {
        if (partner_slug) {
            const data = {
                partner: partner_slug,
                ...params
            }
            userChatDetailMount(data)
        }
    }, [partner_slug])

    const loadMore = useCallback((e) => {
        const r = result[partner_slug]
        const {target} = e
        if (target.offsetHeight - target.scrollTop > target.scrollHeight - 300 && !loading && !!r.next) {
            getList({params: {...initialParams, offset: r.nextOffset}})
        }
    }, [partner_slug, result, getList, loading])

    useEffect(() => {
        if (!mounted) {
            getList({clear: true, params: initialParams})
            setMounted(true)
        }
    }, [getList, mounted])

    return {loadMore}
}
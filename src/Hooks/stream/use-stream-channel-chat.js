import {useCallback, useEffect} from 'react'
import {$streamModel, streamChannelChatMount} from '../../Models/stream-model'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useStreamChannelChat() {
    const {slug_name} = useParams()
    const {$streamChannelChat: {result}} = useStore($streamModel)
    
    const loadMore = useCallback(() => {
        if (result?.nextOffset) {
            console.log(result)
            const params = {
                slug_name: slug_name,
                params: {
                    ...initialParams,
                    offset: result?.nextOffset
                }
            }
            
            streamChannelChatMount(params)
        }
    }, [slug_name, result])
    
    useEffect(() => {
        const params = {
            clear: true,
            slug_name: slug_name,
            params: initialParams
        }
        
        streamChannelChatMount(params)
    }, [slug_name])
    
    return {loadMore}
}
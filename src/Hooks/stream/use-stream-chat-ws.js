import useWebSocket from 'react-use-websocket'
import {streamChannelWSChatMount} from '../../Models/stream-model'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'

export function useStreamChatWs() {
    const {slug_name} = useParams()
    const {$app: {token}} = useStore($appModel)
    const [streamMessageURL, setStreamMessageURL] = useState(null)
    
    const streamChatAction = useWebSocket(streamMessageURL, {
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            if (data.action === 'add' && data.object) {
                streamChannelWSChatMount(data.object)
            }
        }
    })
    
    
    useEffect(() => {
        if (streamChatAction) {
            if (token) {
                setStreamMessageURL(`wss://py.dwed.biz/ws/v1.0/stream/${slug_name}/chat/?token=${token}`)
            } else {
                setStreamMessageURL(`wss://py.dwed.biz/ws/v1.0/stream/${slug_name}/chat/`)
            }
        }
    }, [token, slug_name, streamChatAction])
}
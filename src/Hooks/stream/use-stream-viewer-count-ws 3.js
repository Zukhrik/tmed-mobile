import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useWebSocket from 'react-use-websocket'
import {streamLiveWatchersMount} from '../../Models/stream-model'

export function useStreamViewerCountWs() {
    const {slug_name} = useParams()
    const [streamURL, setStreamURL] = useState(null)
    
    useWebSocket(streamURL, {
        onMessage: (evt) => {
            const data = JSON.parse(evt.data)
            if (data.action === 'live_watchers') {
                streamLiveWatchersMount(data)
            }
        }
    })
    
    useEffect(() => {
        if (slug_name) {
            setStreamURL(`wss://py.dwed.biz/ws/v1.0/stream/${slug_name}/`)
        }
    }, [slug_name])
}
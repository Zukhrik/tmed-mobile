import useWebSocket from 'react-use-websocket'
import {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$appModel, socketCountersMount} from '../../Models/app'
import {addedMessageToListFromSocket, addedMessageFromSocket,} from '../../Models/chat-model'
import {useLocation} from 'react-router-dom'

export function useChatWs() {
    const [chatsUrl, setChatsUrl] = useState(null)
    const {$app: {token}} = useStore($appModel)
    const {pathname} = useLocation()

    const getAddedMessageToListFromSocket = (data) => {
        const objectData = data.object
        const payload = {
            is_muted: objectData.is_muted,
            last_message: {
                date: objectData.date,
                file: objectData.file,
                sender: objectData.sender,
                text: objectData.text,
            },
            receiver: objectData.sender,
            receiver_type: 'user',
            unread_count: data.counters.unread_count
        }
        addedMessageToListFromSocket({type: 'user', payload, key: objectData.sender.username})
    }

    const getAddedMessageToSingleChat = (data) => {
        addedMessageFromSocket({payload: data, key: data.sender.username})
    }

    useWebSocket(chatsUrl, {
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            if (data.counters && data.counters.unread_count_all) {
                socketCountersMount({chatUnreadCounter: data.counters.unread_count_all})
            }
            if (data.action === 'add' && data.object) {
                const isSingle = pathname.match(/([^/]*)\/[^/]*$/)[1] === 'chat'
                getAddedMessageToListFromSocket(data)
                if (isSingle) {
                    getAddedMessageToSingleChat(data.object)
                }
            }
        },
        onError: (e) => {
            // console.log(e)
        }
    })


    useEffect(() => {
        if (token) {
            setChatsUrl(`wss://py.dwed.biz/ws/v1.0/chats/?token=${token}`)
        } else {
            setChatsUrl(null)
        }
    }, [token])
}
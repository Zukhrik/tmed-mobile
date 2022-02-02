import useWebSocket from 'react-use-websocket'
import {
    addedMessageToListFromSocket,
    chatSocketActionsMount,
    updateChatFromSocket,
    updateCounterFromSocket
} from '../../Models/chat-model'
import {$appModel, socketCountersMount} from '../../Models/app'
import {useEffect, useState} from 'react'
import {useStore} from 'effector-react'

export function useChatWsAction() {
    const [chatsActionUrl, setChatsActionUrl] = useState(null)
    const {$app: {token}} = useStore($appModel)

    const chatActions = useWebSocket(chatsActionUrl, {
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            console.log('chat_action', data)
            if (data.action === 'read' && !data.myself) {
                updateChatFromSocket({id: data.chat.id, username: data.user.username, action: 'read'})
                if (data.counters) {
                    socketCountersMount({chatUnreadCounter: data.counters.unread_count_all})
                    addedMessageToListFromSocket({
                        key: data.user.username,
                        type: 'user',
                        payload: {unread_count: data.counters.unread_count}
                    })
                }
            }

            if (data.action === 'typing') {
                updateChatFromSocket({username: data.user.username, action: 'typing', typing: data.typing})
            }

            if (data.myself && data.action_ === 'read' && data.counters) {
                socketCountersMount({chatUnreadCounter: data.counters.unread_count_all})
                updateCounterFromSocket({
                    key: data.user.username,
                    type: 'user',
                    payload: {unread_count: data.counters.unread_count}
                })
            }
        }
    })

    useEffect(() => {
        if (chatActions) {
            chatSocketActionsMount({chatActionSendMessage: chatActions.sendMessage})
        }
    }, [chatActions])

    useEffect(() => {
        if (token) {
            setChatsActionUrl(`wss://py.dwed.biz/ws/v1.0/chats/actions/?token=${token}`)
        } else {
            setChatsActionUrl(null)
        }
    }, [token])
}
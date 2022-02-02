import {useCallback, useEffect, useState} from 'react'
import {useUrlParams} from '../app'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {$chatModel, allChatsMount, chatForceLoading} from '../../Models/chat-model'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useChatList() {
    const {urlData} = useUrlParams()
    const chatTab = urlData[URL_KEYS.CHAT_TAB]
    const {
        $allChatList: {userChatForceLoading, groupChatForCeLoading},
    } = useStore($chatModel)
    const [mounted, setMounted] = useState(false)
    const {push} = useHistory()

    const getList = useCallback((type, params) => {
        
        if (type === URL_VALUES.ALL_CHATS) {
            allChatsMount(params)
        }

        if (type === URL_VALUES.GROUP_CHATS) {
        }
    }, [])

    useEffect(() => {
        if (!chatTab) {
            push({
                pathname: '/chat',
                search: `${URL_KEYS.CHAT_TAB}=${URL_VALUES.ALL_CHATS}`
            })
        }
    }, [chatTab, push])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (chatTab && !mounted) {
                const data = {
                    clear: true,
                    params: {
                        ...initialParams,
                        rtype: 'user'
                    }
                }
                chatForceLoading({type: chatTab})

                if (chatTab === URL_VALUES.ALL_CHATS && userChatForceLoading === 0) {
                    allChatsMount(data)
                }

                if (chatTab === URL_VALUES.GROUP_CHATS && groupChatForCeLoading === 0) {
                }
                setMounted(true)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getList, chatTab, mounted, userChatForceLoading, groupChatForCeLoading])
}
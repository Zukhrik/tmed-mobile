import {$chatModel, allChatsMount, chatForceLoading} from '../../Models/chat-model'
import {URL_VALUES} from '../../Constants'
import {useStore} from 'effector-react'
import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

export function useChatCommon() {
    const {$allChatList: {userChatForceLoading}} = useStore($chatModel)
    const {push} = useHistory()

    const getChatList = useCallback((path) => {
        if (!userChatForceLoading) {
            chatForceLoading(URL_VALUES.ALL_CHATS)
            const data = {
                clear: true,
                params: {
                    limit: 10,
                    offset: 0,
                    rtype: 'user'
                }
            }
            allChatsMount(data)
        }

        if (path) {
            push(path)
        }
    }, [userChatForceLoading, push])

    return {
        getChatList
    }
}
import {createEffect} from 'effector'
import chat from '../../Service/chat'
import user from '../../Service/user'
import org from '../../Service/org'

export const fetchAllChatList = createEffect({
    handler: chat.getAllChats
})

export const fetchGroupChats = createEffect({
    handler: chat.getGroupChats
})

export const fetchUserDetailChat = createEffect({
    handler: chat.getUserChatDetail
})

export const fetchSentMessage = createEffect({
    handler: chat.sendMessageToUser
})

export const fetchUpdateMessage = createEffect({
    handler: chat.updateMessageToUser
})

export const fetchChatAllUser = createEffect({
    handler: user.getAllUsers
})

export const fetchChatAllOrg = createEffect({
    handler: org.getAllOrg
})

export const fetchChatAllGroup = createEffect({
    handler: chat.getAllGroup
})
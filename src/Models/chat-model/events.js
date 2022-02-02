import {createEvent} from 'effector'
import {
    fetchAllChatList,
    fetchChatAllGroup,
    fetchChatAllOrg,
    fetchChatAllUser,
    fetchGroupChats,
    fetchSentMessage,
    fetchUpdateMessage,
    fetchUserDetailChat
} from './effects'

export const allChatsMount = createEvent()
export const groupChatsMount = createEvent()
export const chatAllOrgMount = createEvent()
export const temporaryMessageMount = createEvent()
export const chatForceLoading = createEvent()
export const chatAllUserMount = createEvent()
export const chatAllGroupMount = createEvent()
export const createMessageEvent = createEvent()
export const updateMessageEvent = createEvent()
export const removeMessageEvent = createEvent()
export const userChatDetailMount = createEvent()
export const userSentMessageMount = createEvent()
export const userUpdateMessageMount = createEvent()
export const updateChatFromSocket = createEvent()
export const chatSocketActionsMount = createEvent()
export const addedMessageFromSocket = createEvent()
export const updateCounterFromSocket = createEvent()
export const addedMessageToListFromSocket = createEvent()
export const userMessageUploadProgress = createEvent()

allChatsMount.watch(fetchAllChatList)
groupChatsMount.watch(fetchGroupChats)
chatAllOrgMount.watch(fetchChatAllOrg)
chatAllUserMount.watch(fetchChatAllUser)
chatAllGroupMount.watch(fetchChatAllGroup)
userSentMessageMount.watch(fetchSentMessage)
userChatDetailMount.watch(fetchUserDetailChat)
userUpdateMessageMount.watch(fetchUpdateMessage)

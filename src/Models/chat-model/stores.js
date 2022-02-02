import {combine, createStore} from 'effector'
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
import {
    addedMessageFromSocket,
    addedMessageToListFromSocket,
    chatForceLoading,
    chatSocketActionsMount,
    removeMessageEvent,
    temporaryMessageMount,
    updateChatFromSocket,
    updateCounterFromSocket,
    userMessageUploadProgress,
    userSentMessageMount,
    userUpdateMessageMount
} from './events'
import {URL_VALUES} from '../../Constants'
import {storeListWithKey} from '../../utils/store-utils'
import moment from 'moment'

const $allChatList = createStore({
    loading: false,
    userChats: {},
    groupChats: {},
    userChatResult: {},
    groupChatResult: {},
    error: false,
    userChatForceLoading: 0,
    groupChatForCeLoading: 0
})
    .on(fetchAllChatList.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllChatList.done, (state, {error}) => ({
        ...state, data: [], error, result: {}, forceLoading: 0
    }))
    .on(fetchAllChatList.done, (state, {result, params}) => {
        const userChats = {...state.userChats}
        const groupChats = {...state.groupChats}
        let userChatResult = {}
        let groupChatResult = {}
        let userChatForceLoading = 0
        let groupChatForCeLoading = 0

        const data = result.data.results
        if (params.params.rtype === 'user') {
            for (let i = 0; i < data.length; i++) {
                userChats[data[i].receiver.username] = data[i]
            }
            userChatForceLoading = 2
            userChatResult = {
                nextOffset: params.params.offset + 10,
                ...result.data
            }
        }

        return {
            ...state,
            result: result.data,
            userChatResult,
            userChats,
            groupChatResult,
            groupChats,
            userChatForceLoading,
            groupChatForCeLoading
        }
    })
    .on(addedMessageToListFromSocket, (state, {type, key, payload}) => {
        const userChats = {...state.userChats}

        if (type === 'user') {
            if (state.userChatForceLoading === 2) {
                userChats[key] = userChats[key] ? {...userChats[key], ...payload} : payload
            }
        }

        return {
            ...state,
            userChats
        }
    })
    .on(updateCounterFromSocket, (state, {type, key, payload}) => {
        const userChats = {...state.userChats}

        if (type === 'user') {
            if (state.userChatForceLoading === 2) {
                userChats[key] = userChats[key] ? {...userChats[key], ...payload} : payload
            }
        }

        return {
            ...state,
            userChats
        }
    })
    .on(fetchSentMessage.done, (state, {result, params}) => {
        const {receiver} = params
        const userChats = {...state.userChats}

        if (state.userChatForceLoading === 2 && userChats[receiver]) {
            userChats[receiver] = {
                ...userChats[receiver],
                last_message: {...userChats[receiver].last_message, text: result.data.text}
            }
        }

        return {
            ...state,
            userChats
        }
    })
    .on(chatForceLoading, (state, {type}) => {
        let userChatForceLoading = 0
        let groupChatForCeLoading = 0

        if (type === URL_VALUES.ALL_CHATS) {
            userChatForceLoading = 1
        }

        if (type === URL_VALUES.GROUP_CHATS) {
            groupChatForCeLoading = 1
        }

        return {
            ...state,
            userChatForceLoading,
            groupChatForCeLoading
        }
    })

const $groupChatList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchGroupChats.pending, (state, loading) => ({...state, loading}))
    .on(fetchGroupChats.done, (state, {error}) => ({
        ...state, data: [], error, result: {}, forceLoading: 0
    }))
    .on(fetchGroupChats.done, (state, {result, params}) => {
        const data = params.clear ? result.data.results : [...state.data, ...result.data.results]
        return {
            ...state, result: result.data, data, forceLoading: 2
        }
    })
    .on(chatForceLoading, (state, {type}) => ({
        ...state, forceLoading: type === URL_VALUES.GROUP_CHATS ? 1 : 0
    }))

const $userMessages = createStore({
    loading: true,
    result: {},
    partner: {},
    error: false,
    typing: {},
    messages: {}
})
    .on(fetchUserDetailChat.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserDetailChat.fail, (state, {error}) => ({
        ...state, error, data: {}, result: {}
    }))
    .on(fetchUserDetailChat.done, (state, {result: response, params}) => {
        const {params: {offset}, clear, partner: key} = params
        const result = {...state.result}
        const partner = {...state.sender}
        const typing = {...state.typing}
        const nextOffset = offset + 20
        result[key] = {...response.data, nextOffset}
        partner[key] = response.data.partner
        typing[key] = false
        const messages = {...state.messages}

        const tmp = response.data.results.reduce((acc, cur) => {
            const date = moment(cur.date).format('YYYY-MM-DD')
            acc[date] = acc[date] ? [{...cur}, ...acc[date]] : [{...cur}]
            return acc
        }, {})

        const tmp2 = {}

        if (messages[key]) {
            for (let date in messages[key]) {
                if (messages[key].hasOwnProperty(date)) {
                    if (tmp[date]) {
                        const concated = [...messages[key][date], ...tmp[date]].reduce((acc, cur) => {
                            const i = acc.findIndex(m => m.id === cur.id)
                            if (!~i || !acc[i].checked) {
                                acc.push(cur)
                                if (~i) {
                                    acc.splice(i, 1)
                                }
                            }
                            return acc
                        }, [])
                        tmp2[date] = concated.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    }
                }
            }
        }

        messages[key] = clear
            ? tmp
            : {...state.messages[key], ...tmp, ...tmp2}

        return {
            ...state,
            result,
            partner,
            typing,
            messages
        }
    })
    .on(addedMessageFromSocket, (state, {key, payload}) => {
        const result = {...state.result}
        const messages = {...state.messages}
        const date = moment(payload.date).format('YYYY-MM-DD')

        messages[key] = messages[key] ? {...messages[key]} : {}
        messages[key][date] = messages[key][date] ? [...messages[key][date], {...payload}] : [{...payload}]

        return {
            ...state,
            result,
            messages
        }
    })
    .on(userSentMessageMount, (state, {payload, partner, uuid}) => {
        const messages = {...state.messages}
        const date = moment(payload.date).format('YYYY-MM-DD')
        messages[partner][date] = messages[partner][date]
            ? [...messages[partner][date], {...payload, id: uuid, sent: true, uploadStatus: 0, dataSrc: true}]
            : [{...payload, sent: true}]

        return {
            ...state,
            messages
        }
    })
    .on(userMessageUploadProgress, (state, {partner, payload, status}) => {
        const messages = {...state.messages}
        const date = moment(payload.date).format('YYYY-MM-DD')
        const idx = messages[partner][date].findIndex(item => item.id === payload.id)
        const oldItem = {...messages[partner][date][idx], uploadStatus: status}
        messages[partner][date] = [
            ...messages[partner][date].slice(0, idx),
            {...oldItem},
            ...messages[partner][date].slice(idx + 1)
        ]
        return {
            ...state,
            messages,
        }
    })
    .on(userUpdateMessageMount, (state, {payload, partner}) => {
        const messages = {...state.messages}
        const date = moment(payload.date).format('YYYY-MM-DD')
        const idx = messages[partner][date].findIndex(item => item.id === payload.id)
        const oldItem = {...messages[partner][date][idx], ...payload, sent: true}
        messages[partner][date] = [
            ...messages[partner][date].slice(0, idx),
            {...oldItem},
            ...messages[partner][date].slice(idx + 1)
        ]

        return {
            ...state,
            messages
        }
    })
    .on(removeMessageEvent, (state, {id, key, date}) => {
        const messages = {...state.messages}
        messages[key][date] = messages[key][date].filter(item => item.id !== id)
        return {
            ...state,
            messages
        }
    })
    .on(fetchSentMessage.done, (state, {result: response, params}) => {
        const {partner, uuid} = params
        const date = moment(response.data.date).format('YYYY-MM-DD')
        const result = {...state.result}
        result[partner] = {...result, count: result.count + 1}
        const messages = {...state.messages}
        const data = messages[partner][date]
        const idx = data.findIndex(item => item.id === uuid)
        messages[partner][date] = [
            ...data.slice(0, idx),
            {...response.data, file: messages[partner][date][idx].file, dataSrc: response.data.file},
            ...data.slice(idx + 1)
        ]
        return {
            ...state,
            result,
            messages
        }
    })
    .on(fetchUpdateMessage.done, (state, {result: response, params}) => {
        const {partner, id} = params
        const date = moment(response.data.date).format('YYYY-MM-DD')
        const result = {...state.result}
        result[partner] = {...result, count: result.count + 1}
        const messages = {...state.messages}
        const data = messages[partner][date]
        const idx = data.findIndex(item => item.id === id)
        messages[partner][date] = [
            ...data.slice(0, idx),
            {...messages[partner][date][idx], updated: response.data.updated, sent: false},
            ...data.slice(idx + 1)
        ]
        return {
            ...state
        }
    })
    .on(updateChatFromSocket, (state, {id, username, action, typing: typingStatus}) => {
        const data = {...state.data}
        const typing = {...state.typing}
        const arr = data[username]

        if (arr && arr.length > 0 && action === 'read') {
            const idx = arr.findIndex(item => item.id === id)
            const item = arr.find(item => item.id === id)
            data[username] = [...data[username].slice(0, idx), {
                ...item,
                is_read: true
            }, ...data[username].slice(idx + 1)]
        }

        if (action === 'typing') {
            typing[username] = typingStatus
        }

        return {
            ...state,
            typing,
            data
        }
    })


const $chatSocketActions = createStore({chatActionSendMessage: () => null})
    .on(chatSocketActionsMount, (state, payload) => ({
        ...state, ...payload
    }))

const getStatus = (status) => {
    return status && status === 2 ? status : 1
}

const $searchContact = createStore({
    data: {},
    result: {},
    forceLoading: {},
    error: {}
})
    .on(fetchChatAllUser.pending, (state, loading) => {
        return {
            ...state,
            loading,
            forceLoading: {...state.forceLoading, [URL_VALUES.PEOPLE]: getStatus(state.forceLoading[URL_VALUES.PEOPLE])}

        }
    })
    .on(fetchChatAllUser.fail, (state, {error}) => ({
        ...state,
        error: {...state.error, [URL_VALUES.PEOPLE]: error},
        result: {...state.result, [URL_VALUES.PEOPLE]: false},
    }))
    .on(fetchChatAllUser.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            state,
            response: result.data,
            key: URL_VALUES.PEOPLE,
            clear: params.clear,
            ...params.params
        })

        return {
            ...state,
            ...processed,
            forceLoading: {...state.forceLoading, [URL_VALUES.PEOPLE]: 2},
            error: {...state.error, [URL_VALUES.PEOPLE]: false}
        }
    })
    .on(fetchChatAllOrg.pending, (state, loading) => {
        return {
            ...state,
            loading,
            forceLoading: {
                ...state.forceLoading,
                [URL_VALUES.ORGANIZATION]: getStatus(state.forceLoading[URL_VALUES.ORGANIZATION])
            }
        }
    })
    .on(fetchChatAllOrg.fail, (state, {error}) => ({
        ...state,
        error: {...state.error, [URL_VALUES.ORGANIZATION]: error},
        result: {...state.result, [URL_VALUES.ORGANIZATION]: false},
    }))
    .on(fetchChatAllOrg.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            state,
            response: result.data,
            key: URL_VALUES.ORGANIZATION,
            clear: params.clear,
            ...params.params
        })

        return {
            ...state,
            ...processed,
            forceLoading: {...state.forceLoading, [URL_VALUES.ORGANIZATION]: 2},
            error: {...state.error, [URL_VALUES.ORGANIZATION]: false}
        }
    })
    .on(fetchChatAllGroup.pending, (state, loading) => {
        return {
            ...state,
            loading,
            forceLoading: {
                ...state.forceLoading,
                [URL_VALUES.GROUP]: getStatus(state.forceLoading[URL_VALUES.GROUP])
            }
        }
    })
    .on(fetchChatAllGroup.fail, (state, {error}) => ({
        ...state,
        error: {...state.error, [URL_VALUES.GROUP]: error},
        result: {...state.result, [URL_VALUES.GROUP]: false},
    }))
    .on(fetchChatAllGroup.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            state,
            response: result.data,
            key: URL_VALUES.GROUP,
            clear: params.clear,
            ...params.params
        })

        return {
            ...state,
            ...processed,
            forceLoading: {...state.forceLoading, [URL_VALUES.GROUP]: 2},
            error: {...state.error, [URL_VALUES.GROUP]: false}
        }
    })

const $temporaryMessage = createStore(null)
    .on(temporaryMessageMount, (state, payload) => {
        return payload
    })

// $userMessages.watch(console.log)

export const $chatModel = combine({
    $allChatList,
    $temporaryMessage,
    $userMessages,
    $groupChatList,
    $searchContact,
    $chatSocketActions,
})
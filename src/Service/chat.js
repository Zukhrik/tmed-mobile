import {httpDelete, httpGet, httpPatch, httpPost} from './index'

export default {
    getAllChats: ({params}) => httpGet({url: '/chats/', params}),
    getGroupChats: ({params}) => httpGet({url: '/chats/groups/', params}),
    getUserChatDetail: ({params, partner}) => httpGet({url: `/chats/${partner}/`, params}),
    sendMessageToUser: ({data, partner, onUploadProgress}) => httpPost({
        url: `/chats/${partner}/`,
        data,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress
    }),
    updateMessageToUser: ({data, id, partner}) => httpPatch({url: `/chats/${partner}/${id}/`, data}),
    getAllGroup: ({params}) => httpGet({url: '/chats/groups/', params}),
    removeMessageToUser: ({partner, id, params}) => httpDelete({url: `/chats/${partner}/${id}/`, params})
}
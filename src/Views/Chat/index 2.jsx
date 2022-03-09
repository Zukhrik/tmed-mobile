import React from 'react'
import {NewChat} from './NewChat'
import {ChatMain} from './ChatMain'
import {Route, Switch} from 'react-router-dom'
import {useChatWsAction} from '../../Hooks/chat/use-chat-ws-action'
import {ChatMessagesWithUser} from './ChatMessagesWithUser'

export const ChatPage = () => {
    useChatWsAction()
    return (
        <Switch>
            <Route path='/chat/new' component={NewChat}/>
            <Route path='/chat/@:partner_slug' component={ChatMessagesWithUser}/>
            {/*<Route path='/chat/:receiver' component={ChatMessages}/>*/}
            <Route path='/chat' component={ChatMain}/>
        </Switch>
    )
}
import React, {Fragment} from 'react'
import {MessageGroupDate, MessageGroupItem, MessagesScrollableTarget} from '../style'
import {getDWEDGroupOfChatTime} from '../../../utils/time-utils'
import {MessageItem} from '../MessageItem'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {ChatOverlay} from '../../../Views/Chat/style'

export const MessagesList = ({loadMore, data, height, handleMsgClick, popupShowed}) => {
    const messageGroups = data && Object.keys(data)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    return (
        <MessagesScrollableTarget onScroll={loadMore} height={height} id='scrollableDiv'>
            <ChatOverlay className={`blur-overlay${popupShowed ? ' active' : ''}`}/>
            {
                messageGroups && messageGroups.length > 0 && messageGroups.map(date => {
                    const group = data[date]
                    return (
                        <MessageGroupItem key={date}>
                            <MessageGroupDate>
                                {getDWEDGroupOfChatTime(date)}
                            </MessageGroupDate>
                            {
                                group && group.length > 0 && group.map((item, idx, arr) => {
                                    const sender = arr[idx + 1] && arr[idx + 1].sender
                                    const myAvatar = sender && sender.username !== currentProfile.slug_name && item.sender.avatar
                                    const partnerAvatar = sender && sender.username !== item.sender.username && item.sender.avatar
                                    const me = currentProfile && item.sender.username === currentProfile.slug_name

                                    return (
                                        <Fragment key={item.id}>
                                            <MessageItem
                                                // showAvatar
                                                popupShowed={popupShowed}
                                                me={me}
                                                item={item}
                                                avatar={me ? myAvatar : partnerAvatar}
                                                handleMsgClick={handleMsgClick}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        </MessageGroupItem>
                    )
                })
            }
        </MessagesScrollableTarget>
    )
}
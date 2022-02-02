import React from 'react'
import {MeetDateItem} from './style'
import {CommonAvatar} from '../../../UIComponents/Avatar/CommonAvatar'
export const BookedMeetTime = ({data, active}) => {
    return (
        <MeetDateItem>
            <CommonAvatar
                size={50}
                imgUrl={data.user.avatar}
                active={data.id && active && active.id === data.id ? 1 : 0}
            />
        </MeetDateItem>
    )
}
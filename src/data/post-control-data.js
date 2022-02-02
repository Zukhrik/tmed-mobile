import {ChatSvg} from '../Icons/Chat'
import {POST_ACTIONS} from '../Constants'
import {HeartFillSvg, HeartSvg} from '../Icons/Heart'
import {SendSvg} from '../Icons/Send'

export const postControlData = [
    {
        icon: (status) => status ? HeartFillSvg : HeartSvg,
        count: POST_ACTIONS.LIKES_COUNT,
        title: 'like'
    },
    {
        icon: () => ChatSvg,
        count: POST_ACTIONS.COMMENTS_COUNT,
        title: 'comment'
    },
    {
        icon: () => SendSvg,
        count: POST_ACTIONS.REPOST_COUNT,
        title: 'share'
    }
]
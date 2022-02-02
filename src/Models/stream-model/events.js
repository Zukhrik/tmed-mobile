import {createEvent} from 'effector'
import {
    fetchAllStreamList,
    fetchChannelStreamSchedule,
    fetchPostStreamScheduleId,
    fetchStream,
    fetchStreamChannelChat,
    fetchStreamScheduleId
} from './effects'

export const streamMount = createEvent()
export const allStreamMountList = createEvent()
export const streamScheduleIdMount = createEvent()
export const allStreamScheduleMount = createEvent()
export const postWantingScheduleIdMount = createEvent()
export const streamChannelChatMount = createEvent()
export const streamChannelWSChatMount = createEvent()
export const streamChannelChatTextMount = createEvent()
export const streamLiveWatchersMount = createEvent()


streamMount.watch(fetchStream)
allStreamMountList.watch(fetchAllStreamList)
streamScheduleIdMount.watch(fetchStreamScheduleId)
streamChannelChatMount.watch(fetchStreamChannelChat)
allStreamScheduleMount.watch(fetchChannelStreamSchedule)
postWantingScheduleIdMount.watch(fetchPostStreamScheduleId)

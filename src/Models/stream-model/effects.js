import {createEffect} from 'effector'
import stream from '../../Service/stream'

export const fetchAllStreamList = createEffect({
    handler: stream.getAllStream
})

export const fetchStream = createEffect({
    handler: stream.getStream
})

export const fetchChannelStreamSchedule = createEffect({
    handler: stream.getStreamScheduleList
})

export const fetchStreamScheduleId = createEffect({
    handler: stream.getStreamScheduleById
})

export const fetchPostStreamScheduleId = createEffect({
    handler: stream.postWantingScheduleId
})

export const fetchStreamChannelChat = createEffect({
    handler: stream.getStreamChannelChat
})
import {httpGet, httpPost} from './index'

export default {
    getAllStream: ({params}) => httpGet({url: '/streaming/', params}),
    getStream: ({slug_name, params}) => httpGet({url: `/streaming/${slug_name}/`, params}),
    getStreamScheduleList: ({slug_name, params}) => httpGet({url: `/streaming/${slug_name}/schedule/`, params}),
    getStreamScheduleById: ({slug_name, schedule_id, params}) => httpGet({
        url: `/streaming/${slug_name}/schedule/${schedule_id}/`, params
    }),
    postWantingScheduleId: ({slug_name, schedule_id, params}) => httpPost({
        url: `/streaming/${slug_name}/schedule/${schedule_id}/wanting/`, params
    }),
    getStreamChannelChat: ({params, slug_name}) => httpGet({url: `/streaming/${slug_name}/chat/`, params}),
    postStreamChannelChat: ({data, slug_name}) => httpPost({url: `/streaming/${slug_name}/chat/`, data})
}